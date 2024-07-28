package com.bottleDrop.drop_point.dp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DropPointRepository extends JpaRepository<DropPoint,Long> {

}
