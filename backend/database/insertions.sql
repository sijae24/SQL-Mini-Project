INSERT INTO User (userID, userName, phoneNumber, email) VALUES
(1, 'LeBron James', '6041123457', 'LeBron.James@gmail.com'),
(2, 'Evan Smith', '6045632134', 'evan.smith@gmail.com'),
(3, 'Jake Love', '6042103125', 'jake.love@yahoo.com'),
(4, 'David Lee', '6043331214', 'david.lee@outlook.com'),
(5, 'Richard Smitthins', '6047529351', 'richard.smitthins@gmail.com'),
(6, 'Kim Wexler', '6041999012', 'kim.wexler@gmail.com'),
(7, 'Grace Park', '6047890123', 'grace.park@gmail.com'),
(8, 'Harinder Singh', '6048905555', 'harry.singh@outlook.com'),
(9, 'Jacob Tran', '6049011344', 'jacob.tran@gmail.com'),
(10, 'Stringer Bell', '6048046311', 'stringer.bell@gmail.com'),
(11, 'John Locke', '6048151623', 'john.locke@gmail.com'),
(12, 'Jimin Park', '6046540613', 'jimin.park@gmail.com'),
(13, 'Ashton Hall', '6047418529', 'ashton.hall@outlook.com'),
(14, 'James Flint', '6049638521', 'james.flint@gmail.com'),
(15, 'Kevin Garvey', '6041597531', 'kevin.garvey@gmail.com');

INSERT INTO Personnel (userID, position, salary) VALUES
(1, 'Librarian', 50000),
(2, 'Admin', 45000),
(3, 'Manager', 60000),
(4, 'Volunteer', 0),
(5, 'Tech Support', 48000),
(6, 'Event Coordinator', 52000),
(7, 'Volunteer', 0),
(8, 'Maintenance', 47000),
(9, 'Volunteer', 0),
(10, 'Assistant Manager', 49000);

INSERT INTO LibraryItem (itemID, title, itemType, availability, location, ISBN, author, artist, trackCount, issueNumber, ISSN) VALUES
(1, 'Pride and Prejudice', 'Book', 3, 'Shelf A1', '9780141199078', 'Jane Austen', NULL, NULL, NULL, NULL),
(2, 'Thriller', 'CD', 2, 'Shelf B2', NULL, NULL, 'Michael Jackson', 9, NULL, NULL),
(3, 'Scientific American March', 'Magazine', 5, 'Shelf C3', NULL, NULL, NULL, NULL, 'March2023', 00368733),
(4, 'Nature Neuroscience', 'Journal', 2, 'Online', NULL, NULL, NULL, NULL, NULL, '00280836'),
(5, 'Journal of Data Science', 'Journal', 2, 'Online', NULL, NULL, NULL, NULL, NULL, '23783751'),
(6, 'The Great Gatsby', 'Book', 1, 'Shelf A2', '9780743273565', 'F. Scott Fitzgerald', NULL, NULL, NULL, NULL),
(7, 'Songs in the Key of Life', 'CD', 3, 'Shelf B3', NULL, NULL, 'Stevie Wonder', 5, NULL, NULL),
(8, 'Time Magazine April', 'Magazine', 4, 'Shelf C1', NULL, NULL, NULL, NULL, 'April2023', 00407814),
(9, 'Future of AI', 'Book', 0, 'Shelf D1', NULL, 'John Futureman', NULL, NULL, NULL, NULL),
(10, 'Quantum Mechanics Explained', 'Book', 0, 'Shelf D2', NULL, 'Alice Quantum', NULL, NULL, NULL, NULL),
(11, 'AI and Ethics', 'Book', 0, 'Shelf D3', NULL, 'Sam Ethos', NULL, NULL, NULL, NULL),
(12, 'Smart Libraries 2030', 'Book', 0, 'Shelf D4', NULL, 'Lib Smartman', NULL, NULL, NULL, NULL),
(13, 'Future of Coding', 'Book', 0, 'Shelf D5', NULL, 'Coder Future', NULL, NULL, NULL, NULL),
(14, 'Augmented Education', 'Book', 0, 'Shelf D6', NULL, 'Aug Ed', NULL, NULL, NULL, NULL),
(15, 'Blockchain in Libraries', 'Book', 0, 'Shelf D7', NULL, 'Blocky Chain', NULL, NULL, NULL, NULL),
(16, 'Digital Storytelling', 'Book', 0, 'Shelf D8', NULL, 'Digi Teller', NULL, NULL, NULL, NULL),
(17, 'Quantum Archives', 'Book', 0, 'Shelf D9', NULL, 'Q Archivist', NULL, NULL, NULL, NULL),
(18, 'Next-Gen Cataloging', 'Book', 0, 'Shelf D10', NULL, 'Next Cat', NULL, NULL, NULL, NULL),
(19, 'The Lord of the Rings', 'Book', 4, 'Shelf B1', '9780544003415', 'J.R.R Tolkien', NULL, NULL, NULL, NULL),
(20, 'Sapiens: A Brief History of Humankind', 'Book', 2, 'Shelf B2', '9780062316097', 'Yuval Noah Harari', NULL, NULL, NULL, NULL),
(21, 'One Piece', 'Book', 5, 'Shelf B2', '9781974760329', 'Eiichiro Oda', NULL, NULL, NULL, NULL),
(22, 'Abbey Road', 'CD', 3, 'Shelf C1', NULL, NULL, 'The Beatles', 17, NULL, NULL),
(23, 'To Pimp a Butterfly', 'CD', 2, 'Shelf C2', NULL, NULL, 'Kendrick Lamar', 16, NULL, NULL),
(24, 'National Geographic - April 2025', 'Magazine', 5, 'Shelf M1', NULL, NULL, NULL, NULL, 'Apr2025', '00279358'),
(25, 'Shonen Jump', 'Magazine', 5, 'Shelf M1', NULL, NULL, NULL, NULL, 'April2025', '10707199');

INSERT INTO FutureItem (itemID, arrivalDate) VALUES
(9, '2025-04-03'),
(10, '2025-04-01'),
(11, '2025-04-09'),
(12, '2025-04-10'),
(13, '2025-04-10'),
(14, '2025-04-11'),
(15, '2025-04-12'),
(16, '2025-04-13'),
(17, '2025-04-13'),
(18, '2025-04-14');


INSERT INTO Donates (donationID, userID, itemID, donationDate) VALUES
(1, 3, 5, '2025-03-27'),
(2, 4, 10, '2025-03-25'),
(11, 5, 11, '2025-04-02'),
(12, 6, 12, '2025-04-03'),
(13, 7, 13, '2025-04-03'),
(14, 8, 14, '2025-04-04'),
(15, 9, 15, '2025-04-05'),
(16, 10, 16, '2025-04-06'),
(17, 1, 17, '2025-04-06'),
(18, 2, 18, '2025-04-07');



INSERT INTO Room (roomID, roomName, capacity) VALUES
(1, 'Main Hall', 100),
(2, 'Tech Room', 40),
(3, 'Study Lounge', 30),
(4, 'Conference Room A', 20),
(5, 'Workshop Studio', 25),
(6, 'Event Pavilion', 150),
(7, 'Seminar Room', 35),
(8, 'Reading Nook', 15),
(9, 'VR Lab', 12),
(10, 'Quiet Room', 10);


INSERT INTO HelpRequest (requestID, userID, request, status) VALUES
(1, 2, 'Need help with finding academic journals.', 'Open'),
(2, 5, 'Printer on 2nd floor is not working.', 'Resolved'),
(3, 7, 'How do I renew a book online?', 'Open'),
(4, 6, 'Room booking system not responding.', 'In Progress'),
(5, 3, 'Can I get access to archived newspapers?', 'Open'),
(6, 8, 'Unable to login to library portal.', 'Resolved'),
(7, 4, 'Lost my library card. How do I replace it?', 'Open'),
(8, 9, 'Is there a quiet space for study?', 'Resolved'),
(9, 10, 'Need assistance uploading a document.', 'In Progress'),
(10, 1, 'What is the fine for a lost book?', 'Open');

INSERT INTO Event (eventID, eventName, eventType, audience, date, personnelID, roomID) VALUES
(1, 'Resume Workshop', 'Workshop', 'Students', '2025-04-05', 1, 1),
(2, 'Digital Research Skills', 'Workshop', 'Teens', '2025-04-06', 2, 2),
(3, 'Author Lecture: Sci-Fi Futures', 'Lecture', 'Adults', '2025-04-07', 3, 3),
(4, 'Library Orientation Lecture', 'Lecture', 'Everyone', '2025-04-08', 4, 4),
(5, 'Climate Change & Books Seminar', 'Seminar', 'Adults', '2025-04-09', 5, 5),
(6, 'Academic Writing Seminar', 'Seminar', 'Students', '2025-04-10', 6, 6),
(7, 'Annual Library Innovation Conf.', 'Conference', 'Everyone', '2025-04-11', 7, 7),
(8, 'Youth Literacy Conference', 'Conference', 'Teens', '2025-04-12', 8, 8),
(9, 'Data Literacy Workshop', 'Workshop', 'Adults', '2025-04-13', 9, 9),
(10, 'Publishing Trends Conference', 'Conference', 'Adults', '2025-04-14', 10, 10);

INSERT INTO Borrows (userID, itemID, borrowDate, dueDate, returnDate, fine, status)
VALUES 
  (1, 1, '2024-03-01', '2024-03-10', NULL, 0, 'borrowed'),
  (2, 3, '2025-02-15', '2025-02-28', '2025-03-05', 3.5, 'returned'),
  (3, 2, '2025-03-20', '2025-04-03', NULL, 0, 'borrowed'),
  (4, 6, '2024-12-01', '2024-12-15', '2025-03-01', 38.0, 'returned'),
  (5, 10, '2025-03-28', '2025-04-11', NULL, 0, 'borrowed'),
  (6, 4, '2025-03-10', '2025-03-24', '2025-03-23', 0, 'returned'),
  (7, 5, '2025-03-01', '2025-03-15', '2025-03-16', 0.5, 'returned'),
  (8, 11, '2025-03-25', '2025-04-08', NULL, 0, 'borrowed'),
  (9, 7, '2025-03-05', '2025-03-19', '2025-03-18', 0, 'returned'),
  (10, 15, '2025-03-27', '2025-04-10', NULL, 0, 'borrowed');



INSERT INTO Attends (userID, eventID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7);

