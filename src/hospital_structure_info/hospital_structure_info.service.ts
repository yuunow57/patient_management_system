import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalStructureInfoEntity } from './hospital_structure_info.entity';
import { Repository } from 'typeorm';
import { CreateStructureDto } from './dto/create-structure.dto';
import { HospitalEmailEntity } from 'src/hospital_email/hospital_email.entity';

@Injectable()
export class HospitalStructureInfoService {
    constructor (
        @InjectRepository(HospitalStructureInfoEntity)
        private readonly structureRepository: Repository<HospitalStructureInfoEntity>,
        @InjectRepository(HospitalEmailEntity)
        private readonly emailRepository: Repository<HospitalEmailEntity>
    ) {}

    // POST /hospital/structure
    async create(dto: CreateStructureDto) {
        let level = 1;
        let parent: HospitalStructureInfoEntity | null = null;

        const hospital = await this.emailRepository.findOneBy({ hospital_code: dto.hospital_code });
        if (!hospital) throw new NotFoundException('존재하지 않는 병원입니다.');
        
        if (dto.parents_code) {
            parent = await this.structureRepository.findOne({
                where: {
                    hospital_st_code: dto.parents_code
                }
            });

            if (!parent) throw new NotFoundException('부모 레벨이 존재하지 않습니다.');

            level = parent.level + 1;
        }

        const structure = await this.structureRepository.create({
            hospitalCode: hospital,
            category_name: dto.category_name,
            level,
            parents: parent ?? undefined,
            sort_order: dto.sort_order,
            note: dto.note,
            description: dto.description,
        });

        await this.structureRepository.save(structure);

        return {
            hospital_st_code: structure.hospital_st_code,
            hospital_code: structure.hospital_code,
            category_name: structure.category_name,
            level: structure.level,
            parents_code: structure.parents?.hospital_st_code,
            sort_order: structure.sort_order,
            create_at: structure.create_at,
            note: structure.note,
            description: structure.description,
        }
    }

    // GET /hospital/structure/part?hospital_code{hospital_code}
    async partcheck(hospitalCode: number) {
        const email = await this.emailRepository.findOneBy({ hospital_code: hospitalCode });
        if (!email) throw new NotFoundException('존재하지 않는 병원입니다.');

        const parts = await this.structureRepository.find({
            where: {
                hospital_code: hospitalCode,
                level: 1,
            },
            select: ['hospital_st_code', 'category_name', 'sort_order']
        });

        return {
            hospital_code: Number(hospitalCode),
            hospital_name: email.hospital_name,
            parts: parts.map(part => ({
                hospital_code: Number(part.hospital_st_code),
                category_name: part.category_name,
                sort_order: part.sort_order,
            }))
            //parts,
        }
    }

    // GET /hospital/structure/floor?hospital_st_code={hospital_st_code}
    async floorcheck(hospitalStCode: number) {
        const structure = await this.structureRepository.findOneBy({ hospital_st_code: hospitalStCode });
        if (!structure) throw new NotFoundException('존재하지 않는 구조입니다.');

        const floors = await this.structureRepository.find({
            where: {
                parents: { hospital_st_code: hospitalStCode },
                level: 2,
            },
            relations: { parents: true },
            select: { 
                parents: { hospital_st_code: true }, 
                hospital_st_code: true, 
                category_name: true, 
                sort_order: true
            }
        });

        return {
            category_name: structure.category_name,
            floors: floors.map(floor => ({
                parents_code: Number(floor.parents?.hospital_st_code),
                hospital_st_code: Number(floor.hospital_st_code),
                category_name: floor.category_name,
                sort_order: floor.sort_order,
            })),
        };
    }
}
