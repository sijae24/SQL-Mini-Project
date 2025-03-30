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
(10, 'Ben Shepphard', '6048046311', 'ben.shepphard@gmail.com');

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
(3, 'Scientific American March', 'Magazine', 5, 'Shelf C3', NULL, NULL, NULL, NULL, 'March2023', NULL),
(4, 'Nature Neuroscience', 'Journal', 2, 'Online', NULL, NULL, NULL, NULL, NULL, '0028-0836'),
(5, 'Future of AI', 'Book', 0, 'Shelf D1', NULL, 'John Futureman', NULL, NULL, NULL, NULL),
(6, 'The Great Gatsby', 'Book', 1, 'Shelf A2', '9780743273565', 'F. Scott Fitzgerald', NULL, NULL, NULL, NULL),
(7, 'Kind of Blue', 'CD', 3, 'Shelf B3', NULL, NULL, 'Miles Davis', 5, NULL, NULL),
(8, 'Time Magazine April', 'Magazine', 4, 'Shelf C1', NULL, NULL, NULL, NULL, 'April2023', NULL),
(9, 'Journal of Data Science', 'Journal', 2, 'Online', NULL, NULL, NULL, NULL, NULL, '2378-3751'),
(10, 'Quantum Mechanics Explained', 'Book', 0, 'Shelf D2', NULL, 'Alice Quantum', NULL, NULL, NULL, NULL),
(11, 'AI and Ethics', 'Book', 0, 'Shelf D3', NULL, 'Sam Ethos', NULL, NULL, NULL, NULL),
(12, 'Smart Libraries 2030', 'Book', 0, 'Shelf D4', NULL, 'Lib Smartman', NULL, NULL, NULL, NULL),
(13, 'Future of Coding', 'Book', 0, 'Shelf D5', NULL, 'Coder Future', NULL, NULL, NULL, NULL),
(14, 'Augmented Education', 'Book', 0, 'Shelf D6', NULL, 'Aug Ed', NULL, NULL, NULL, NULL),
(15, 'Blockchain in Libraries', 'Book', 0, 'Shelf D7', NULL, 'Blocky Chain', NULL, NULL, NULL, NULL),
(16, 'Digital Storytelling', 'Book', 0, 'Shelf D8', NULL, 'Digi Teller', NULL, NULL, NULL, NULL),
(17, 'Quantum Archives', 'Book', 0, 'Shelf D9', NULL, 'Q Archivist', NULL, NULL, NULL, NULL),
(18, 'Next-Gen Cataloging', 'Book', 0, 'Shelf D10', NULL, 'Next Cat', NULL, NULL, NULL, NULL);

INSERT INTO LibraryItem (title, itemType, availability, location, ISBN, author)
VALUES 
('The Book Thief', 'Book', 4, 'Shelf B1', '9780375842207', 'Markus Zusak'),
('Sapiens: A Brief History of Humankind', 'Book', 2, 'Shelf B2', '9780062316097', 'Yuval Noah Harari');

INSERT INTO LibraryItem (title, itemType, availability, location, artist, trackCount)
VALUES 
('Abbey Road', 'CD', 3, 'Shelf C1', 'The Beatles', 17),
('To Pimp a Butterfly', 'CD', 2, 'Shelf C2', 'Kendrick Lamar', 16);

INSERT INTO LibraryItem (title, itemType, availability, location, issueNumber, ISSN)
VALUES 
('National Geographic - April 2025', 'Magazine', 5, 'Shelf M1', 'Apr2025', '0027-9358');



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

INSERT INTO Event (eventID, eventName, eventType, audience, date, personnelID, roomID) VALUES
(1, 'Intro to SQL', 'Workshop', 'Students', '2025-04-10', 1, 2),
(2, 'Data Science Meetup', 'Talk', 'General Public', '2025-04-12', 3, 1),
(3, 'Resume Building Session', 'Workshop', 'Job Seekers', '2025-04-14', 6, 5),
(4, 'Python Bootcamp', 'Training', 'Beginners', '2025-04-15', 2, 3),
(5, 'Library Tech Tour', 'Tour', 'All Ages', '2025-04-18', 5, 9),
(6, 'AI in Everyday Life', 'Seminar', 'Tech Enthusiasts', '2025-04-20', 10, 4),
(7, 'Mindfulness & Reading', 'Session', 'Adults', '2025-04-22', 4, 10),
(8, 'Book Club: Fiction Night', 'Discussion', 'Members', '2025-04-25', 7, 8),
(9, 'Kids Coding Hour', 'Activity', 'Children', '2025-04-26', 1, 6),
(10, 'Ethics of AI', 'Panel', 'Academics', '2025-04-28', 3, 7);

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


INSERT INTO Borrows (borrowID, userID, itemID, borrowDate, dueDate, returnDate, fine, status) VALUES
(1, 1, 1, '2025-03-10', '2025-03-17', '2025-03-16', 0, 'returned'),
(2, 2, 2, '2025-03-20', '2025-03-27', '2025-03-29', 1.0, 'returned late'),
(3, 3, 6, '2025-03-22', '2025-03-29', NULL, 0, 'borrowed'),
(4, 4, 7, '2025-03-18', '2025-03-25', '2025-03-24', 0, 'returned'),
(5, 5, 1, '2025-03-21', '2025-03-28', NULL, 0, 'borrowed'),
(6, 6, 2, '2025-03-22', '2025-03-29', NULL, 0, 'borrowed'),
(7, 7, 6, '2025-03-15', '2025-03-22', '2025-03-23', 0.5, 'returned late'),
(8, 8, 1, '2025-03-20', '2025-03-27', NULL, 0, 'borrowed'),
(9, 9, 7, '2025-03-10', '2025-03-17', '2025-03-17', 0, 'returned'),
(10, 10, 6, '2025-03-12', '2025-03-19', '2025-03-22', 1.5, 'returned late');


INSERT INTO Room (roomID, roomName, capacity) VALUES
(1, 'Room A', 25),
(2, 'Room B', 40),
(3, 'Room C', 30),
(4, 'Digital Lab', 20),
(5, 'Conference Hall', 100),
(6, 'Children Area', 15),
(7, 'AV Room', 35),
(8, 'Study Zone 1', 12),
(9, 'Seminar Room', 50),
(10, 'Lecture Hall', 80);

INSERT INTO Event (eventID, eventName, eventType, audience, date, personnelID, roomID) VALUES
(1, 'Story Time', 'Kids', 'Children', '2025-04-05', 1, 6),
(2, 'Author Talk: Sci-Fi Futures', 'Talk', 'Adults', '2025-04-07', 2, 5),
(3, 'Resume Workshop', 'Workshop', 'Teens', '2025-04-08', 3, 2),
(4, 'Digital Literacy 101', 'Class', 'Seniors', '2025-04-09', 4, 4),
(5, 'Board Game Night', 'Social', 'Everyone', '2025-04-10', 5, 1),
(6, 'Art Hour', 'Activity', 'Kids', '2025-04-11', 6, 6),
(7, 'Climate Change Panel', 'Seminar', 'Adults', '2025-04-12', 7, 9),
(8, 'Yoga for Wellness', 'Health', 'Adults', '2025-04-13', 8, 10),
(9, 'Coding for Beginners', 'Workshop', 'Teens', '2025-04-14', 9, 3),
(10, 'Scholarship Info Session', 'Info', 'Students', '2025-04-15', 10, 7);

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

INSERT INTO Borrows (userID, itemID, borrowDate, dueDate, returnDate, fine, status)
VALUES 
  (1, 1, '2024-03-01', '2024-03-10', NULL, 'borrowed'),
  (2, 3, '2025-02-15', '2025-02-28', '2025-03-05', 3.5, 'returned'),
  (3, 2, '2025-03-20', '2025-04-03', NULL, 0, 'borrowed'),
  (4, 6, '2024-12-01', '2024-12-15', '2025-03-01', 38.0, 'returned'),
  (5, 10, '2025-03-28', '2025-04-11', NULL, 0, 'borrowed'),
  (6, 4, '2025-03-10', '2025-03-24', '2025-03-23', 0, 'returned'),
  (7, 5, '2025-03-01', '2025-03-15', '2025-03-16', 0.5, 'returned'),
  (8, 11, '2025-03-25', '2025-04-08', NULL, 0, 'borrowed'),
  (9, 7, '2025-03-05', '2025-03-19', '2025-03-18', 0, 'returned'),
  (10, 15, '2025-03-27', '2025-04-10', NULL, 0, 'borrowed');


