-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Czas generowania: 11 Sty 2023, 18:40
-- Wersja serwera: 8.0.31
-- Wersja PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `app_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `doctorDB`
--

CREATE TABLE `doctorDB` (
  `id` int NOT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `doctorDB`
--

INSERT INTO `doctorDB` (`id`, `nick`, `name`, `surname`) VALUES
(1, 'jkowalski', 'Jan', 'Kowalski'),
(2, 'akowalczyk', 'Anna', 'Kowalczyk'),
(3, 'mtestowy', 'Michał', 'Testowy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `productDB`
--

CREATE TABLE `productDB` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `cost` int NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `productDB`
--

INSERT INTO `productDB` (`id`, `name`, `cost`, `quantity`) VALUES
(1, 'dental floss', 20, 59),
(2, 'toothpaste', 100, 40);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `serviceDB`
--

CREATE TABLE `serviceDB` (
  `id` int NOT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `fullnick` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `time` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `serviceDB`
--

INSERT INTO `serviceDB` (`id`, `nick`, `fullnick`, `time`) VALUES
(1, 'tw', 'teeth whitening', 120),
(2, 'ic', 'implant consultation', 60),
(3, 'rc', 'removing cavity', 30),
(4, 'cc', 'consultaion', 60),
(5, 'c', 'canal', 180),
(6, 'rot', 'Removal of a tooth', 120);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `submitedvisitdb`
--

CREATE TABLE `submitedvisitdb` (
  `id` int NOT NULL,
  `visitid` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `usedinventory` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `submitedvisitdb`
--

INSERT INTO `submitedvisitdb` (`id`, `visitid`, `description`, `usedinventory`) VALUES
(1, 22, 'bylo git', 'cos tam');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userDB`
--

CREATE TABLE `userDB` (
  `id` int NOT NULL,
  `login` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `role` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `surname` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `userDB`
--

INSERT INTO `userDB` (`id`, `login`, `password`, `role`, `email`, `name`, `surname`) VALUES
(2, 'szychasz', '$2b$10$22.Dlqgm8QddbXrtBbRzvu4gpXENecOZTGKrOroVMBHLBp8pP3jkO', 'user', 'szymon@gmaill.copm', 'szymon', 'zegzda'),
(4, 'szymon', '$2b$10$MkdzqZKxUhl4cAlLJnKgceCUUhrx0p0cl8SYiHFVvnmXlIXZbillC', 'user', 'szymon@gmaill.222copm', 'szymo2222n', 'zegzda222'),
(5, 'szymon11', '$2b$10$ZwxKRr5X7VSodq3QafqjJecEW2xytIuppJV6mqOztzcevz92WtVne', 'user', 'szymon@gmaill.222copm', 'szymo2222n', 'zegzda222'),
(6, 'szymonz', '$2b$10$mw..CFMv/fM56mK7sGA4Ne7tcvMImk50rhjzaKHImS6WBT3DF0dsO', 'user', 'szymon@gmaill.222copmm', 'szymo2222n', 'zegzda222'),
(19, 'ehe', '$2b$10$f6SXTUDz9xPIuWoYFBPHZuaK6EHJgtITVN2Zcld/VuIQonBUqqNEW', 'user', 'rettre', 'hherherth', 'hehe'),
(20, 'szychasz100', '$2b$10$knaPz/nNbX1mUu6yetRNSOb6tKgPYRaX8wLlYXkeg.V7ZxllNAjPa', 'user', 'sasasasassas', 'szymon', 'zegzda'),
(21, 'szychasz007', '$2b$10$AUWKD0t/5xT8PCxdQHSkXOfJrKZREIZGC.OG0b9hAAPXZoAb9W51C', 'admin', 'szymonzegzda@gmail.com', 'szymon', 'zegzda'),
(22, 'szychasz008', '$2b$10$qPXfX71NqYz/GAwNtYeQq.Igb0o76nvgCdhZvhJTZ44YLmfsReELW', 'admin', 'szymonzegzda@gmail.com', 'szymon', 'zegzda'),
(23, 'gotham222', '$2b$10$ArtdINwHeRHY.I6/cQ0waeZgFwrwkC0ylYW4aX7eXTQL0o8YaSX2K', 'user', 'gotham22@vp.pl', 'szymon', 'tymula'),
(24, 'szychasz102', '$2b$10$sk93m0WxemXDmQHql6bSP.6B8EHxGb/DCHosfjF08cpbyhCeRqQuK', 'user', 'dsdsdsd', 'dwsdw', 'dwdwd'),
(25, 'szychasz013', '$2b$10$DS9R6WPtcsmDU7TcWlop2O9lRNKiKRwIwpNscVJkVqWgmKlYAYWIa', 'user', 'dswefregwerg', 'cdvev', 'fevbev'),
(26, 'szychasz1', '$2b$10$oGmvYHwlSd9ro33Y1URMAOLwhMy5mTnuQ4j/WXEFcVYU8qqzS2/Fu', 'user', 'szychasz007', 'Szymon', 'fwfwf'),
(27, 'admin', '$2b$10$ryJy17ky7.BaAi0klCPwSev4yECBL2BU17J4x93DlqD4Sj2B4/BwS', 'admin', 'swdqwdf', 'szdwfw', 'dwwf'),
(32, 'doctor1', '$2b$10$2hllStYmC8h52mNLw884X.FFZFC9LWN.7g2EjlgUKc.0GrbMFgL9C', 'doctor', 'ssss', 'szymon', 'edef'),
(33, 'skdffn', '$2b$10$j76RWzI/MGHh8fSlgdpN9uyZ8EjV46cTpLtYDyVwlTEy4qF1e5kBO', 'user', 'iuhiuhi@gmail.com', 'auto', 'Au');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `visitDB`
--

CREATE TABLE `visitDB` (
  `id` int NOT NULL,
  `doctorid` int NOT NULL,
  `patientid` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `date` date NOT NULL,
  `starttime` int NOT NULL,
  `endtime` int NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL,
  `service` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `visitDB`
--

INSERT INTO `visitDB` (`id`, `doctorid`, `patientid`, `email`, `date`, `starttime`, `endtime`, `phone`, `service`) VALUES
(22, 2, 2, 'eggerge', '2023-01-11', 610, 790, 'geger', 'c'),
(24, 2, 2, 'zegzgus', '2023-01-31', 661, 721, 'defdef', 'cc'),
(26, 1, 23, 'gotham22@vp.pl', '2023-01-12', 1203, 1323, '6554856', 'tw'),
(30, 1, 27, 'gergergegr', '2023-01-10', 661, 781, 'htjytjytjjtyjj', 'tw');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `doctorDB`
--
ALTER TABLE `doctorDB`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `productDB`
--
ALTER TABLE `productDB`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `serviceDB`
--
ALTER TABLE `serviceDB`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `submitedvisitdb`
--
ALTER TABLE `submitedvisitdb`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `userDB`
--
ALTER TABLE `userDB`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `visitDB`
--
ALTER TABLE `visitDB`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `doctorDB`
--
ALTER TABLE `doctorDB`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `productDB`
--
ALTER TABLE `productDB`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `serviceDB`
--
ALTER TABLE `serviceDB`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `submitedvisitdb`
--
ALTER TABLE `submitedvisitdb`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `userDB`
--
ALTER TABLE `userDB`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT dla tabeli `visitDB`
--
ALTER TABLE `visitDB`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
