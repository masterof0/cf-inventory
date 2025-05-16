-- Migration number: 0001 	 2025-05-16T00:26:01.102Z

DROP TABLE IF EXISTS NxStage;
CREATE TABLE NxStage (
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    PartNum TEXT, 
    Name TEXT NOT NULL, 
    Description TEXT NOT NULL, 
    Qty INT, 
    BoxQty Int NOT NULL
);