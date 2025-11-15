// Name data for character generation

export interface NameSet {
  firstName: string[];
  lastName: string[];
}

export const westernNames: NameSet = {
  firstName: [
    'Aiden', 'Arron', 'Zach', 'James', 'Alan', 'Peter', 'Steve',
    'Tom', 'Tim', 'Gary', 'Sam', 'Kevin', 'Mark', 'Chester', 'Mike',
    'Edward', 'Dyson', 'Tyson', 'Howard', 'Tony', 'Jason', 'Marnus',
    'Jordan', 'Felix', 'Quinton', 'Alex', 'Alexander', 'Steven',
    'Liam', 'Kendrick', 'Austin', 'Bailey', 'Edgar',
    'Carl', 'Markus', 'Hector', 'Wyatt', 'Ryan', 'Billy', 'Joey',
    'Ronald', 'Charlie', 'Jacob', 'Jake', 'Jonathon', 'John',
    'Kelvin', 'Corey', 'Matthew', 'Henry', 'Clint', 'Cody',
    'Jim', 'Robert', 'Harry', 'Joe',
    'Samuel', 'Arnold', 'Donald', 'Drake', 'Toby', 'Jeremy',
    'Ron', 'Craig', 'Emmett', 'Jasper',
    'Jarrod', 'Morgan', 'Morris', 'Nash', 'Pete', 'Shane',
    'Warren', 'Webb', 'Wayne', 'Trent', 'Wesley', 'Weston', 'Wylie',
    'Zeke', 'Andrew', 'Zak', 'Wade', 'Oscar', 'Victor',
  ],
  lastName: [
    'Smith', 'Markram', 'Wolfram', 'Woods', 'Marsh', 'Anderson', 'Wright',
    'Samson', 'Joyce', 'Burns', 'Lee', 'Hooper', 'Stark', 'Starc', 'Barker',
    'Parker', 'Butler', 'Hodges', 'Holmes', 'Garner', 'Lawrence',
    'Oliver', 'Cruz', 'Dean', 'Nelson', 'Williams', 'Williamson',
    'Stuart', 'Woody', 'Turner', 'Rhodes', 'Washington', 'Owens',
    'Osborn', 'Florence', 'Wilson', 'Patterson', 'Peterson', 'Riley',
    'Dawson', 'Blair', 'Waters', 'Park', 'Miller', 'Bennington',
    'Leonard', 'Marshall', 'Stone', 'Roy', 'Stokes', 'Morgan', 'Freeman',
    'Yates', 'Drake', 'Wade', 'Griffin', 'Stevens', 'Stevenson', 'Cook',
    'Pierce', 'Roberts', 'Newton', 'White', 'Black', 'Bond',
    'Lyon', 'Perkins', 'Perkinson', 'Paul', 'Goodman', 'Sanders',
    'Little', 'Hales',
    'Alexson', 'Guzman', 'Chambers', 'Phelps', 'Hughes',
    'Jackson', 'Coleson', 'Carlson', 'Mason', 'McGill', 'Mackenzie',
    'Stein',
  ],
};

export const scandinavianNames: NameSet = {
  firstName: [
    'Arne', 'Bjorn', 'Kai', 'Hans', 'Magnus', 'Raum', 'Von', 'Kasper',
    'Axl', 'Jens', 'Stellan', 'Markus', 'Olaf', 'Steig', 'Ivar', 'Sven',
    'Otto', 'Elias', 'Eino', 'Jakob', 'Filip', 'Guðmundur', 'Sigurður',
    'Jón', 'Gunner', 'Erik', 'Kristian', 'Van', 'Gustaf', 'Ludwig',
  ],
  lastName: [
    'Kjellberg', 'Andersson', 'Johansson', 'Jensen', 'Neilson',
    'Christensen', 'Andersen', 'Sørensen', 'Jørgensen',
    'Olsen', 'Møller', 'Carlsen', 'Johnsen', 'Larsen', 'Hagen', 'Haugen',
    'Jacobsen', 'Andreassen', 'Halvorssen', 'Eriksen', 'Berg',
    'Karlsen', 'Larsson', 'Pettersen', 'Svensson', 'Gustaffson',
    'Hansson', 'Olofsson', 'Magnusson', 'Jansson', 'Lindberg',
  ],
};

export const chineseNames: NameSet = {
  firstName: [
    'Lì', 'Wěi', 'Fang', 'Xiùyīng', 'Min', 'Jing',
    'Qiáng', 'Jūn', 'Yáng', 'Yǒng', 'Yàn', 'Jié', 'Lěi',
    'Tāo', 'Chāo', 'Xiùlán', 'Xiá', 'Píng', 'Guìyīng',
  ],
  lastName: [
    'Wáng', 'Zhāng', 'Lǐ', 'Chén', 'Liú', 'Yáng', 'Huáng', 'Zhào',
    'Wú', 'Zhōu', 'Chow', 'Xú', 'Sūn', 'Tzu', 'Mǎ', 'Zhū', 'Hú', 'Guō',
    'Hé', 'Gāo', 'kao', 'Zhèng', 'Cheng', 'Liáng', 'Xiè', 'Sòng',
    'Táng', 'Hán', 'Han', 'Cáo', 'Péng', 'Tián', 'Dǒng', 'Yuán',
  ],
};

export const japaneseNames: NameSet = {
  firstName: [
    'Haruto', 'Minato', 'Yūto', 'Suko', 'Yuito', 'Aoto',
    'Aoi', 'Hinata', 'Riku', 'Ren', 'Hayato', 'Sota', 'Yuto',
    'Ryota', 'Ibuki', 'Yushin', 'Satoshi', 'Yuta', 'Hikaru',
    'Itsuki', 'Ryiku', 'Sora', 'Rui', 'Shota', 'Kosei',
  ],
  lastName: [
    'Takahashi', 'Suzuki', 'Masuda', 'Kinoshita', 'Nakagawa',
    'Nakamura', 'Yamamoto', 'Watanabe', 'Ito', 'Kobayashi',
    'Sasaki', 'Yamaguchi', 'Matsumoto', 'Yamashita', 'Hasegawa',
    'Saito', 'Fujiwara', 'Okamoto', 'Matsuda', 'Miyazaki',
    'Sano', 'Onishi', 'Sugimoto', 'Otsuka', 'Kojima', 'Uchida', 'Tajiri',
  ],
};

export const indianNames: NameSet = {
  firstName: [
    'Ravi', 'Aditya', 'Suresh', 'Virat', 'Aryan', 'Arjun', 'Aarav',
    'Vihan', 'Reyansh', 'Ayush', 'Aayush', 'Satvik', 'Rudra', 'Darsh',
    'Danish', 'Pratyush', 'Ishaan', 'Aayan', 'Krishna', 'Arnav', 'Akshay',
    'Akshit', 'Akshat', 'Ansh', 'Gautam', 'Rohan', 'Agastaya', 'Pranav',
    'Arun', 'Dev', 'Parth', 'Raghav', 'Shaurya', 'Vivaan', 'Jai',
  ],
  lastName: [
    'Kumar', 'Singh', 'Das', 'Ali', 'Agarwal', 'Khatri', 'Ahuja',
    'Anand', 'Patel', 'Reddy', 'Bakshi', 'Banerjee', 'Bhatt', 'Bedi',
    'Verma', 'Varma', 'Dalal', 'Chadha', 'Dutta', 'Deol', 'Kohli',
    'Joshi', 'Iyer', 'Jain', 'Ghosh', 'Dhar', 'Gandhi', 'Gupta',
    'Dixit', 'Dhawan', 'Dewan', 'Kapoor', 'Kapur', 'Chopra', 'Kurana',
    'Chandra', 'Chauhan', 'Gill', 'Mehta',
  ],
};

export const latinNames: NameSet = {
  firstName: [
    'José', 'Luis', 'Carlos', 'Juan', 'Jorge', 'Pedro', 'Jesús',
    'Manuel', 'Santiago', 'Sebastián', 'Matías', 'Nicolás', 'Samuel',
    'Alejandro', 'Diego', 'Mateo', 'Joaquín', 'Gabriel', 'Tomás',
    'Emmanuel', 'Ignacio', 'Adrián', 'Miguel', 'Vicente',
    'Pablo', 'Eduardo', 'Kevin', 'Esteban', 'Óscar', 'Josué',
  ],
  lastName: [
    'Garica', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez',
    'González', 'Pérez', 'Sánchez', 'Díaz', 'Álvarez',
    'Romero', 'Ramírez', 'Marín', 'Iglesias', 'Vázquez',
    'Torres', 'Ortega', 'Cruz', 'Cortez', 'Castillo',
    'Garza', 'Méndez', 'Castro', 'Vargas',
  ],
};

export const slavicNames: NameSet = {
  firstName: [
    'Andrei', 'Andrik', 'Anton', 'Casimir', 'Dimitri', 'Dimitrov',
    'Vladmir', 'Danek', 'Boris', 'Boleslav', 'Damir', 'Damek', 'Dmitri',
    'Ivan', 'Jaromir', 'Milos', 'Lazlo', 'Niklaus', 'Nikolas',
    'Yakov', 'Yasha', 'Zelimir', 'Zeljiko', 'Gregor',
  ],
  lastName: [
    'Andreychuk', 'Antonov', 'Arsenyev', 'Bakalowitz', 'Balabanov',
    'Berezovsky', 'Borsa', 'Bulgakov', 'Cherkassky', 'Chaykovskiy',
    'Domljanović', 'Dvorský', 'Fedoruk', 'Brzęczyszczykiewicz',
    'Hrushevksy', 'Khodasevich', 'Khasbulatov', 'Yablonsky',
    'Yegorov', 'Kasparov', 'Karolewski', 'Kokoschka', 'Minkowski',
  ],
};

export const frenchNames: NameSet = {
  firstName: [
    'Gabriel', 'Louis', 'Raphael', 'Adam', 'Paul',
    'Arthur', 'Alexandre', 'Victor', 'Augustin', 'Simon',
    'Leo', 'Eliott', 'Charles', 'Emmanuel', 'Jean', 'Felix',
    'Ludwig', 'Gustav', 'Evan', 'Antonin', 'Henri', 'Marius',
  ],
  lastName: [
    'Martin', 'Lavigne', 'Blanchet', 'Monet', 'Toussaint',
    'Gernier', 'Laurent', 'Dupont', 'Macron', 'Corbin', 'Dubois',
    'Leroy', 'Cartier', 'Rousseau', 'Beaufort', 'Lyon', 'Chastain',
    'LaRue', 'Renault', 'Vernier', 'Beaumont', 'Auclair', 'Baudelaire',
    'Cadieux', 'Abbe', 'Boileau', 'Boisseau',
  ],
};

export const otherAsianNames: NameSet = {
  firstName: [
    'Somchai', 'Somsak', 'Arthit', 'Kittisak', 'Paithoon', 'Anurak',
    'Apinya', 'Chaisai', 'Chalerm', 'Kasemchai', 'Phassakorn',
    'Panit', 'Ritthirong', 'Tanawat',
  ],
  lastName: [
    'Saetang', 'Chen', 'Saelim', 'Wang', 'Anchali', 'Ambhom',
    'Anuman', 'Charoensuk', 'Makok', 'Paśú', 'Pravat',
    'Rattanakosin', 'Suwannarat', 'Shinawatra',
  ],
};

export const namesByRegion = {
  western: westernNames,
  scandinavian: scandinavianNames,
  chinese: chineseNames,
  japanese: japaneseNames,
  indian: indianNames,
  latin: latinNames,
  slavic: slavicNames,
  french: frenchNames,
  otherAsian: otherAsianNames,
};
