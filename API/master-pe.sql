-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 08:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `master-pe`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `CartID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`CartID`, `ProductID`, `UserID`, `Quantity`) VALUES
(71, 489, 57, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryID` int(11) NOT NULL,
  `Category_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `Category_name`) VALUES
(2, 'Embroideries'),
(3, 'Arts'),
(4, 'Accessories'),
(6, 'Plates'),
(8, 'warmth'),
(473, 'Test Category'),
(476, 'Test Category');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TotalPrice` int(11) DEFAULT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`OrderID`, `UserID`, `TotalPrice`, `OrderDate`) VALUES
(8, 57, 40, '2023-12-22 14:53:47'),
(9, 57, 60, '2023-12-22 15:03:53'),
(10, 57, 80, '2023-12-22 15:04:16'),
(11, 57, 60, '2023-12-22 15:05:35'),
(12, 57, 60, '2023-12-22 15:06:17'),
(13, 57, 80, '2023-12-22 15:07:04'),
(14, 57, 80, '2023-12-22 15:10:33'),
(15, 57, 40, '2023-12-22 15:14:50'),
(16, 57, 80, '2023-12-22 15:16:02'),
(17, 57, 80, '2023-12-22 15:16:24'),
(18, 57, 80, '2023-12-22 15:16:49'),
(19, 57, 40, '2023-12-22 15:18:43'),
(20, 57, 20, '2023-12-22 15:25:13'),
(21, 57, 140, '2023-12-22 15:30:58'),
(22, 57, 100, '2023-12-22 21:20:11'),
(23, 57, 20, '2023-12-23 23:24:11');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `product` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`product`, `OrderID`, `Quantity`, `Price`) VALUES
(495, 8, 1, 20),
(490, 8, 1, 20),
(489, 9, 1, 20),
(490, 9, 1, 20),
(491, 9, 1, 20),
(489, 10, 1, 20),
(490, 10, 1, 20),
(491, 10, 1, 20),
(495, 10, 1, 20),
(489, 11, 1, 20),
(490, 11, 1, 20),
(491, 11, 1, 20),
(489, 12, 1, 20),
(490, 12, 1, 20),
(491, 12, 1, 20),
(489, 13, 1, 20),
(490, 13, 1, 20),
(491, 13, 1, 20),
(495, 13, 1, 20),
(489, 14, 1, 20),
(490, 14, 2, 20),
(491, 14, 1, 20),
(489, 15, 1, 20),
(490, 15, 1, 20),
(489, 16, 1, 20),
(490, 16, 1, 20),
(491, 16, 1, 20),
(495, 16, 1, 20),
(489, 17, 1, 20),
(490, 17, 1, 20),
(491, 17, 1, 20),
(495, 17, 1, 20),
(489, 18, 1, 20),
(490, 18, 1, 20),
(491, 18, 1, 20),
(495, 18, 1, 20),
(489, 19, 1, 20),
(490, 19, 1, 20),
(489, 20, 1, 20),
(490, 21, 5, 20),
(491, 21, 2, 20),
(497, 22, 1, 20),
(490, 22, 3, 20),
(491, 22, 1, 20),
(489, 23, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductID` int(11) NOT NULL,
  `categoryID` int(10) NOT NULL,
  `StoreID` int(11) DEFAULT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 1,
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductID`, `categoryID`, `StoreID`, `ProductName`, `Description`, `Price`, `Quantity`, `Image`) VALUES
(489, 2, 12, 'Sample Product', 'This is a sample product description.', 20, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4CbFvxhEv9UKQ2uAeuLXkNQ5_zAnTmWC9w&usqp=CAU'),
(490, 2, 12, 'Sample Product', 'This is a sample product description.', 20, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4CbFvxhEv9UKQ2uAeuLXkNQ5_zAnTmWC9w&usqp=CAU'),
(495, 2, NULL, 'Sample Product', 'This is a sample product description.', 20, 10, 'https://www.ammonnews.net/img/big/20157111834RN203.jpeg?small'),
(496, 2, NULL, 'Sample Product', 'This is a sample product description.', 20, 10, 'https://www.ammonnews.net/img/big/20157111834RN203.jpeg?small'),
(499, 2, 12, 'Sample Product', 'This is a sample product description.', 20, 10, 'ahmad_path'),
(500, 2, 12, 'Sample Product', 'This is a sample product description.', 20, 10, 'ahmad_path'),
(504, 473, NULL, 'Sample Product', 'This is a sample product description.', 30, 100, 'https://example.com/sample-product-image.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `RatingID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `RatingValue` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `DateRated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`RatingID`, `UserID`, `ProductID`, `RatingValue`, `Comment`, `DateRated`) VALUES
(9, 57, 489, 4, '\nCertainly! To have the store name and image next to each other, you can adjust the structure of your HTML and use CSS for styling. ', '2023-12-22 19:25:40'),
(12, 57, 489, 4, 'ahmadlaith', '2023-12-22 20:50:26'),
(13, 57, 489, 4, 'ahmadlaith', '2023-12-22 20:53:07'),
(14, 57, 489, 4, 'ahmadlaith', '2023-12-23 08:15:45'),
(15, 57, 489, 4, 'ahmad', '2023-12-23 08:26:57'),
(16, 57, 490, 4, 'abode ', '2023-12-23 15:37:52');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`RoleID`, `RoleName`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, ' bus_account.');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `StoreID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `StoreName` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `StoreImage` varchar(255) NOT NULL,
  `IsActive` enum('1','2') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`StoreID`, `UserID`, `StoreName`, `Category`, `StoreImage`, `IsActive`) VALUES
(12, 30, 'Updated Store', 'Books', 'updated_store_image.jpg', '2'),
(930, 57, 'ahmad', 'Electronics', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Iy83S3JOsv6aeeKXwFRu6zCtBvRih9OrjkrOr0Yb5ba7-xwCUo10iY7pJwOKJpoIPfQ&usqp=CAU', '2'),
(932, 57, 'ahmad', 'Electronics', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Iy83S3JOsv6aeeKXwFRu6zCtBvRih9OrjkrOr0Yb5ba7-xwCUo10iY7pJwOKJpoIPfQ&usqp=CAU', '2'),
(936, 57, 'Example Store', 'Electronics', 'C:/xampp/htdocs/Master-pes/master-pesss/view/Home/assets/images/DALL·E 2023-12-23 20.27.57 - A picturesque view of a Palestinian city, capturing its unique architectural beauty and cultural essence. The image includes historical buildings with.png', '2'),
(937, 57, 'Example Store', 'Electronics', '../../view/Home/assets/imagesDALL·E 2023-12-23 20.27.57 - A picturesque view of a Palestinian city, capturing its unique architectural beauty and cultural essence. The image includes historical buildings with.png', '2'),
(938, 57, 'Example Store', 'Electronics', '../../view/Home/assets/imagesDALL·E 2023-12-23 20.27.57 - A picturesque view of a Palestinian city, capturing its unique architectural beauty and cultural essence. The image includes historical buildings with.png', '2'),
(939, 50, 'ahmad', 'aaaaaaaaaa', '../../view/Home/assets/imagesmovie-1.png', '2'),
(940, 25, 'laith', 'elctor', '../../view/Home/assets/imagesupcoming-3.png', '2'),
(941, 1441, 'John\'s Store', 'Electronics', 'http://example.com/store_image.jpg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `successstory`
--

CREATE TABLE `successstory` (
  `StoryID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `StoryText` text DEFAULT NULL,
  `DatePublished` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `RoleID` int(11) DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `UserName`, `Password`, `Email`, `RoleID`) VALUES
(23, 'testuser', '$2y$10$wJkWd6VssB6N.Ih1NN3tHepKSDx7JlA53yGYTCSWBGy9dvAK/lkbi', 'testuser@example.com', 2),
(24, 'testuser223', '$2y$10$hRaDTxvZjV1CfhRyIK/cQ.aumrV6UNyS7x2ZpA/m9zXoH8Az9q/dq', 'testuser@example.com', 2),
(25, 'testuser223', '$2y$10$5Yz2OmprL.n.DY17GygSrO/HopjFenkzFBDl4HDt9czCxTf81W9ui', 'testuser@example.com', 2),
(26, 'testuser223', '$2y$10$eXxPeRI0QgrQ4sKpCJL/QuBTBN5/zSjERG6z6IWbOUkYEVhQ7bydi', 'testuser@example.com', 2),
(27, 'test_user', '$2y$10$w2UnsBYtsM9pEoChUQhR/uGbC1tIwcItjLG9PO42TtUwh3EW0pOEi', 'test_user@example.com', 2),
(28, 'test_user', '$2y$10$IxYBY8bLSdWR9/1mM5IOfehmH1pVvO2dX3IWrbxS8xciBeShJQkLK', 'test_user@example.com', 2),
(29, 'testuser', '$2y$10$2ibYnbtuPCoPKL8a4FRlHOgEse30t9lM8BqaoHDikL9Tyi0ZQXgIC', 'test@example.com', 2),
(30, 'testuser', '$2y$10$6wo.THxjDKES/.cabB/b2eQSLC1b0t1Ei39HiJrZJsB3rmBwUaXAi', 'test@example.com', 2),
(41, 'huda', '$2y$10$TzU5jn.xuyoG2eHSnM0Xhu7BPbzoDDldpmkGMGmczmJuJWCdj1TmS', 'postmaster@localhost', 2),
(47, 'aa', '$2y$10$uBjQ5JtR2oFX65eEAzxksuKf8h1W8QB.9J2mxX3Vh2nJ3bJRdrXym', '@example.com', 2),
(48, 'aa', '$2y$10$WO3v4yrAuKOF/iupvSSegOBW0.bjLqyzg463j1COewCyLEVihcfSy', 'ahmad@example.com', 2),
(49, 'klm', '$2y$10$eHpMOaeD4kXEHB0wqNj0G.XwBrZOh5S2hBprgeQ2.eg1Gy5Lj5HLC', 'ahmad@example.com', 2),
(50, 'klm', '$2y$10$DLP7vqN5xNZ/dkXVEFARWeW0oxgXvdPq0P8rJuetbNkIPVbojVGee', 'ahmad@example.com', 2),
(51, 'klm', '$2y$10$GVZVWDjMEnaNGay4jAAr7O931Bf1XQdAdaZKZ7ibBBLnlcZIIrpAy', 'ahmad@example.com', 2),
(52, 'klm', '$2y$10$kpI033iaG1LBwNSVWxqQQOcYcsxqA8pfASk4mCHXbRTrt0C8uyJ1S', 'ahmad@example.com', 2),
(53, 'klm', '$2y$10$tB0UPC3FL2MJdxBnjt0X3.7te9JuYO81QboMYw/Q3C/2P42KT1MPC', 'ahmad@example.com', 2),
(54, 'klm', '$2y$10$CZw0L7DDDdkkvCL4fvFrGe5BeqHdjjubwgKHSn1DofC9WgdTrqYAq', 'ahmad@example.com', 2),
(55, 'klm', '$2y$10$mbP9aWaOgB4bG2L27aca2uDIoctweQAqnoh/DzXbc4ufQKD1nRyZu', 'ahmad@example.com', 2),
(56, 'yaxan', '$2y$10$XnW7kAXTdoqM5YK.1Q3iyejqyg1MPcjsL18geZrEIZh6hNBK0K16G', 'ahmad@example.com', 2),
(57, 'ahmadali', '$2y$10$b.fLlnx8hvLZ7qNKJ3aDAeUI98zPyXpCM/Nbw6MkkcoJ/Gq4b95WC', 'osamaalhmadeen05@gmail.com', 1),
(1433, 'klll', '$2y$10$tfl/hFW.WB.CEVbMy9O9GeDUHxPQvz2lP8i2uQLDCtakqvDJsmvzO', 'testuser@example.com', 2),
(1434, 'klll', '$2y$10$YIsY9cv839Jmwpv2nIm4YO0.BUJwDcLQqNyaBYr3khhEGdLGnxSK2', 'testuser@example.com', 2),
(1435, 'klll', '$2y$10$DQ7IQ1XWEs3N9umftWNKKegEx0wuCWdazs6w4vwOlAiYP4U5nXS1m', 'testuser@example.com', 2),
(1436, 'werfgthjmnhg', '$2y$10$nopGU62dLxUDZkxEqECNhOrTQbpKfDjXWaBiBh.r3DuXY/9pukLGG', 'ahmadalhmadeen123@gmail.com', 2),
(1437, 'werfgthjmnhg', '$2y$10$bb2cBi0D81NAclsZEtorb.3N7OUipAtwWw142jR/iLX7CHRiU4rGK', 'shmsd@gmail.com', 2),
(1438, 'testuser223', '$2y$10$J9tf.8bYIZJsTJ.tRN6GWOcaDKfCck48K.RhR36Hn3U0wwCjI0oXu', 'testuser@example.com', 2),
(1439, 'testuser223', '$2y$10$VWBP1WOprXk3E75AZWTF/uVo/kUx91bkoOjI0mAtjzh0Jqn8VT4g2', 'testuser@example.com', 2),
(1440, 'test_user', '$2y$10$Tezx0ehKTr50O9Nyy0yLneGrcp0qMltAQ7S3/E8dlXFd4hh.bL8KW', 'test_user@example.com', 2),
(1441, 'john_doe', '$2y$10$yUNcGVny6.vrB4gLVOLOf.JKfCk9wAlRqe5pAVOOdY15DZM8dbbwe', 'john.doe@example.com', 2);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `WishlistID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`WishlistID`, `UserID`, `ProductID`) VALUES
(20, 57, 489),
(21, 57, 490);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD KEY `OrderID` (`OrderID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `StoreID` (`StoreID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`RatingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`StoreID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `successstory`
--
ALTER TABLE `successstory`
  ADD PRIMARY KEY (`StoryID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`WishlistID`),
  ADD KEY `wishlist_ibfk_1` (`UserID`),
  ADD KEY `wishlist_ibfk_2` (`ProductID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=477;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `RatingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `StoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=942;

--
-- AUTO_INCREMENT for table `successstory`
--
ALTER TABLE `successstory`
  MODIFY `StoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1442;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `WishlistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `successstory`
--
ALTER TABLE `successstory`
  ADD CONSTRAINT `successstory_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `store` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
