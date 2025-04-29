import { createMap } from '@automapper/core';
import { mapper } from '../config';
import { FreelancerDetailDTO } from '../core';
import { FreelancerDetailEntity } from '../core';

export function createFreelancerMappings() {
  createMap(mapper, FreelancerDetailDTO, FreelancerDetailEntity);
}
