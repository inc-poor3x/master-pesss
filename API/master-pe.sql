-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 04:44 PM
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
  `ProductID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`CartID`, `ProductID`, `UserID`, `Quantity`) VALUES
(8, 5, 5, 4);

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
(8, 'warmth');

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
(3, 5, 1500, '2023-11-27 09:45:00'),
(4, 6, 125, '2023-11-28 11:15:00'),
(5, 5, 3900, '2023-12-04 14:48:26'),
(6, 5, 3900, '2023-12-04 15:10:52'),
(7, 5, 3250, '2023-12-04 15:38:46');

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
(5, 3, 1, 600),
(6, 4, 3, 75),
(5, 6, 6, 650),
(5, 7, 5, 650);

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
  `Quantity` int(11) DEFAULT NULL,
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductID`, `categoryID`, `StoreID`, `ProductName`, `Description`, `Price`, `Quantity`, `Image`) VALUES
(5, 2, 4, 'Updated Product', 'This product has been updated', 25, 15, 'https://misswood.eu/cdn/shop/articles/7-marcas-handmade-que-te-van-a-chiflar-285653.jpg?v=1596548782'),
(31, 2, 4, 'Sample Product', 'This is a sample product description.', 20, 10, 'https://misswood.eu/cdn/shop/articles/7-marcas-handmade-que-te-van-a-chiflar-285653.jpg?v=1596548782');

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
(7, 5, 5, 4, 'This is a great product!', '2023-12-03 18:47:23');

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
(4, 4, 'Updated Store', 'Books', 'updated_store_image.jpg', '2'),
(5, 5, 'Test User Store', 'Clothing', '', '2'),
(6, 5, 'Test User Second Store', 'Books', '', '1'),
(9, 5, 'Test Store', 'Electronics', 'path/to/your/image.jpg', '1'),
(11, 22, 'Test Store', 'Electronics', 'path/to/store/image.jpg', '1'),
(12, 30, 'Test Store', 'Test Category', '', '1'),
(15, 35, 'John\'s Store', 'Electronics', 'http://example.com/store_image.jpg', '1'),
(16, 38, 'fffffff', 'asssd', 'https://cdn.shopify.com/s/files/1/0070/7032/files/selling-handmade-goods.png?format=jpg&quality=90&v=1528140509', '1');

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
  `RoleID` int(11) DEFAULT 2,
  `imag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `UserName`, `Password`, `Email`, `RoleID`, `imag`) VALUES
(1, 'newUsername', 'newPassword', 'newemail@example.com', 1, 'new_image_url'),
(4, 'newUsername', 'newPassword', 'newemail@example.com', 1, 'new_image_url'),
(5, 'newUsername', '$2y$10$rlCma1Vron0lVrLApazyFeXYUZuygdbt4AaLAHLwYynIVB6H3Xh8G', 'newemail@example.com', 2, 'new/path/to/image.jpg'),
(6, 'test_guest', 'guest_password_test', 'guest_test@example.com', 2, 'guest_image_test.jpg'),
(9, 'osama_1', 'admin_password', 'admin@example.com', 2, 'admin_image.jpg'),
(13, 'osama_1', 'admin_password', 'admin@example.com', 2, 'admin_image.jpg'),
(17, 'taset_1', '$2y$10$YswcK41aWYzyHWwBeIHDYenotNE4aBQG0wer.thrGQcz9CxZh/JwO', 'testuser@example.com', 2, 'testimage.jpg'),
(18, '', '$2y$10$wgVLarw3MnDrvqkTs3NoFOaqeX22iPHMgTL8RtcqY6FB0Hqxm4qL6', '', 2, NULL),
(19, 'test_user', '$2y$10$UoTVIa014WBeIZJMp/WsPe7czg4pc.UGloT6rFF6N16tHA8J05wqm', 'test_user@example.com', 2, NULL),
(20, 'AHMAD', '$2y$10$FL6m1jzPtGJCfVf26lQ7d.h360jeKckc6h91jlLtWl5SDxrHBs2Qa', 'test_user@example.com', 2, NULL),
(22, 'test_user', '$2y$10$ixIDwfRDT65hUokaK7sfMOJYldlyG/.vIAaKPy3/S8N3AkhxZbI5O', 'test_user@example.com', 2, NULL),
(23, 'testuser', '$2y$10$wJkWd6VssB6N.Ih1NN3tHepKSDx7JlA53yGYTCSWBGy9dvAK/lkbi', 'testuser@example.com', 2, 'path/to/image.jpg'),
(24, 'testuser223', '$2y$10$hRaDTxvZjV1CfhRyIK/cQ.aumrV6UNyS7x2ZpA/m9zXoH8Az9q/dq', 'testuser@example.com', 2, 'path/to/image.jpg'),
(25, 'testuser223', '$2y$10$5Yz2OmprL.n.DY17GygSrO/HopjFenkzFBDl4HDt9czCxTf81W9ui', 'testuser@example.com', 2, 'path/to/image.jpg'),
(26, 'testuser223', '$2y$10$eXxPeRI0QgrQ4sKpCJL/QuBTBN5/zSjERG6z6IWbOUkYEVhQ7bydi', 'testuser@example.com', 2, 'path/to/image.jpg'),
(27, 'test_user', '$2y$10$w2UnsBYtsM9pEoChUQhR/uGbC1tIwcItjLG9PO42TtUwh3EW0pOEi', 'test_user@example.com', 2, NULL),
(28, 'test_user', '$2y$10$IxYBY8bLSdWR9/1mM5IOfehmH1pVvO2dX3IWrbxS8xciBeShJQkLK', 'test_user@example.com', 2, NULL),
(29, 'testuser', '$2y$10$2ibYnbtuPCoPKL8a4FRlHOgEse30t9lM8BqaoHDikL9Tyi0ZQXgIC', 'test@example.com', 2, NULL),
(30, 'testuser', '$2y$10$6wo.THxjDKES/.cabB/b2eQSLC1b0t1Ei39HiJrZJsB3rmBwUaXAi', 'test@example.com', 2, NULL),
(31, 'john_doe', '$2y$10$6mMypwB4sreNyEusMSrQQeh0H3tKuxfsxo4JGWglyBnAyAzZIJ6vO', 'john.doe@example.com', 2, NULL),
(32, 'ahnad', '12345678', 'test_user@example.com', 2, NULL),
(33, 'aaaaa', '$2y$10$51lXlskdemN4SUAUUWZnEeLQzpB5937nPBtgf0tg8B66lNQpdNWna', 'test_user@example.com', 2, NULL),
(34, 'aa', '$2y$10$sxoNSx79DRGKrMWXlPOvt.Y2HKL4PTadSJlcju01/V/kNBMMglyhy', 'test_user@example.com', 2, NULL),
(35, 'ahmad,laith', '$2y$10$3wJ8MNNhJ0iBtXQB2Ls1JOwJn6QRmsAP9QNfPfQkaY.iPJpk0IlJS', 'john.doe@example.com', 2, NULL),
(36, 'khaled', '$2y$10$lr1HHDEMIk4RiwwOdSTS0OCuTKw9ER4N/Vi2jKwrZzfmGpk.zV.JO', '3@gmail.com', 2, NULL),
(37, 'Ahmad', '$2y$10$TJXy4zPFO2KsV5LroAoSXOXLVgUa5RNUQCzLD6NYfSNZhY7D5Puoi', '31901001045@std.bau.edu.jo', 2, NULL),
(38, 'ahmad', '$2y$10$07meSo.wMVxdFbeGZ5TpROSXkoMRlQH6AlDtDWMNqZxy5cbV4yWfG', '31901001045@std.bau.edu.jo', 2, NULL);

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
(9, 9, 5);

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
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `RatingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `StoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `successstory`
--
ALTER TABLE `successstory`
  MODIFY `StoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `WishlistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
