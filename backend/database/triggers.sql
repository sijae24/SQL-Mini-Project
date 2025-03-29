-- Trigger to auto-set arrivalDate for FutureItem donations

CREATE TRIGGER SetArrivalDateOnDonation
AFTER INSERT ON Donates
WHEN (SELECT itemType FROM LibraryItem WHERE itemID = NEW.itemID) IS NOT NULL
BEGIN
    INSERT INTO FutureItem (itemID, arrivalDate)
    VALUES (NEW.itemID, DATE(NEW.donationDate, '+7 days'));
END;


-- Trigger to decrease availability when item is borrowed
CREATE TRIGGER DecreaseAvailability
AFTER INSERT ON Borrows
FOR EACH ROW
WHEN (
    (SELECT availability FROM LibraryItem WHERE itemID = NEW.itemID) > 0
)
BEGIN
    UPDATE LibraryItem
    SET availability = availability - 1
    WHERE itemID = NEW.itemID;
END;

-- Trigger to increase availability when item is returned
CREATE TRIGGER IncreaseAvailabilityOnReturn
AFTER UPDATE OF returnDate ON Borrows
FOR EACH ROW
WHEN OLD.returnDate IS NULL AND NEW.returnDate IS NOT NULL
BEGIN
    UPDATE LibraryItem
    SET availability = availability + 1
    WHERE itemID = NEW.itemID;
END;

-- fines
CREATE TRIGGER ApplyFineOnLateReturn
AFTER UPDATE OF returnDate ON Borrows
FOR EACH ROW
WHEN NEW.returnDate > NEW.dueDate
BEGIN
    UPDATE Borrows
    SET fine = (JULIANDAY(NEW.returnDate) - JULIANDAY(NEW.dueDate)) * 0.50
    WHERE borrowID = NEW.borrowID;
END;


