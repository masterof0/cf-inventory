DROP TABLE IF EXISTS NxStage;
CREATE TABLE IF NOT EXISTS NxStage (ID INTEGER PRIMARY KEY AUTOINCREMENT, PartNum TEXT, Name TEXT, Description TEXT, Qty INT, BoxQty Int);
INSERT INTO NxStage (PartNum, Name, Description, Qty, BoxQty) VALUES ('PAK-001', 'packs', 'Filter Packs (x1)', 4, 1),
('RFP-204-A', 'premix', 'Solution (5000ml x2)', 17, 2),
('SAK-303', 'sacks', 'Dialysate Sacks (50L x2)', 14, 2),
('CAR-170E', 'cartrige', 'Dialysate Cartrige (x6)', 6, 6),
('SAL-10', 'saline', 'Saline (1000ml x10)', 2, 10);