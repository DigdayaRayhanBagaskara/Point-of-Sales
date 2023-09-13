ALTER TABLE `pointofsales`.`employee` 
DROP FOREIGN KEY `employee_ibfk_1`;
ALTER TABLE `pointofsales`.`employee` 
ADD CONSTRAINT `employee_ibfk_1`
  FOREIGN KEY (`id_outlet`)
  REFERENCES `pointofsales`.`outlet` (`id_outlet`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `pointofsales`.`employee_access` 
DROP FOREIGN KEY `FK_id_employee`;
ALTER TABLE `pointofsales`.`employee_access` 
ADD CONSTRAINT `FK_id_employee`
  FOREIGN KEY (`id_employee`)
  REFERENCES `pointofsales`.`employee` (`id_employee`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
