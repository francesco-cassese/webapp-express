-- 0. RIMOZIONE TABELLE ESISTENTI
DROP TABLE IF EXISTS `product_category`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;

-- 1. CREAZIONE TABELLE
CREATE TABLE `products`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `image` VARCHAR(255) DEFAULT "placeholder.png",
    `is_available` TINYINT NOT NULL, 
    `place_of_origin` VARCHAR(45) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE `categories`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL
);

CREATE TABLE `product_category`(
    `product_id` BIGINT UNSIGNED NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL 
);

ALTER TABLE `product_category` 
    ADD INDEX `product_category_product_id_category_id_index`(`product_id`, `category_id`);

CREATE TABLE `reviews`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(45) NOT NULL,
    `title` VARCHAR(255) NULL,
    `review_content` TEXT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `rating` TINYINT NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL 
);

ALTER TABLE `product_category` 
    ADD CONSTRAINT `product_category_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE;

ALTER TABLE `reviews` 
    ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

ALTER TABLE `product_category` 
    ADD CONSTRAINT `product_category_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

-- 2. INSERIMENTO CATEGORIE
INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Drink', 'Soluzioni liquide idratanti ad alto coefficiente di rinfresco.'),
(2, 'Piatto', 'Macro-aggregati di porchetta serviti su supporto ceramico.'),
(3, 'Contorno', 'Elementi di contorno che orbitano attorno al piatto principale.'),
(4, 'Vegana', 'Paradossi gastronomici ad altissimo contenuto di erba e simulazioni molecolari.'),
(5, 'Digitale', 'Porchetta binaria ottimizzata per sysadmin, dev e amanti del codice pulito.'),
(6, 'Parallela', 'Varianti culinarie provenienti da dimensioni alternative e linee temporali distorte.'),
(7, 'Chimica', 'Composti instabili, legami covalenti saporiti e reazioni esotermiche sul palato.'),
(8, 'Fisica Quantistica', 'Porchetta che esiste e non esiste contemporaneamente fino al primo morso.'),
(9, 'Biologia', 'Sezioni anatomiche ad alto contenuto proteico e modificazioni cellulari gustose.'),
(10, 'Astronomia', 'Corpi celesti di ciccioli e croste croccanti che sfidano la gravità.'),
(11, 'Matematica', 'Geometrie perfette di grasso e magro calcolate con la sequenza di Fibonacci.'),
(12, 'Paleontologia', 'Porchetta stagionata ere geologiche fa, con crosta fossile super croccante.');

-- 3. INSERIMENTO PRODOTTI (ID 8 rimosso)
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `is_available`, `place_of_origin`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Porchetta Volante', 'Lanciata direttamente dal cameriere sfruttando l effetto Magnus.', 14.50, 'volante.jpg', 1, 'Laboratorio Aerodinamico', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'Porchetta Nucleare', 'Arricchita all uranio saporito. Emissioni di gusto alpha, beta e gamma.', 18.00, 'nucleare.jpg', 1, 'Chernobyl (Cucina 4)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'Porchetta Sticks', 'Algoritmo di porchetta fritto in porzioni lineari O(1).', 6.50, 'sticks.jpg', 1, 'Friggitrice Quantistica', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(4, 'Il Big Pork', 'La singolarità iniziale da cui è nato l universo della porchetta.', 19.99, 'big_pork.jpg', 1, 'Centro del Cosmo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(5, 'Porchetta Spazio-Temporale', 'Curva lo spaziotempo nel tuo stomaco. Attenzione ai buchi neri.', 16.50, 'spazio_tempo.jpg', 1, 'Area 51', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(6, 'Porchetta Geneticamente Alterata', 'Cresciuta ascoltando stringhe di codice e musica techno.', 15.00, 'ogm.jpg', 1, 'Incubatrice Beta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(7, 'Porchetta Universo 4587B', 'Importata direttamente tramite portale interdimensionale.', 22.00, 'universo.jpg', 1, 'Multiverso', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(9, 'Hello Pork', 'Il primo approccio al mondo della porchetta. Semplice e compilato.', 10.00, 'hello_pork.jpg', 1, 'Localhost', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(10, 'PorCH4etta', 'Porchetta legata a molecole di metano. Esplosiva.', 13.50, 'metano.jpg', 1, 'Tavola Periodica', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(11, 'Lost Pork 404', 'Il cameriere giura che esiste, ma la cucina non la trova.', 4.04, '404.jpg', 1, 'Server Sconosciuto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(12, 'Porchetta CRUDs', 'Create, Read, Update, Delete... direttamente nel tuo stomaco.', 14.00, 'cruds.jpg', 1, 'Database Centrale', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(13, 'Schrödinger Pork', 'Finché non apri il panino è sia al sangue che ben cotta.', 15.50, 'schrodinger.jpg', 1, 'Scatola di Cartone', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(14, 'Porchetta String Theory', 'Fili di cotenna intrecciati in 11 dimensioni parallele.', 17.50, 'strings.jpg', 1, 'Acceleratore di Particelle', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(15, 'CyberPork 2077', 'Porchetta cibernetica con innesti di rosmarino al neon.', 20.00, 'cyber.jpg', 1, 'Night City', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(16, 'Stack Overflow Pork', 'Porchetta così abbondante che causa il crash del piatto.', 19.00, 'overflow.jpg', 1, 'Memoria RAM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(17, 'Porchetta di Neanderthal', 'Cotta su pietra focaia e cacciata con metodi paleolitici.', 13.00, 'neanderthal.jpg', 1, 'Canyon del Gusto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(18, 'Mito-Pork-dria', 'La centrale energetica della cellula, ma al sapore di finocchietto.', 14.80, 'mitocondrio.jpg', 1, 'Citoplasma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(19, 'Porchetta di Fibonacci', 'La spirale di cotenna segue perfettamente la sezione aurea.', 11.23, 'fibonacci.jpg', 1, 'Pisa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(20, 'Idrogeno Pork', 'L elemento più leggero dell universo, fritto nel grasso.', 8.00, 'idrogeno.jpg', 1, 'Sole', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(21, 'Porchetta Dark Matter', 'Nessuno sa di cosa sia fatta, ma rappresenta il 27% della massa della cena.', 21.50, 'dark_matter.jpg', 1, 'Spazio Profondo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(22, 'Git Push --force Pork', 'Ti entra nello stomaco che tu lo voglia o no, sovrascrivendo la fame.', 16.00, 'git.jpg', 1, 'GitHub Enterprise', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(23, 'Porchetta Isotonica', 'Igienicamente bilanciata per ripristinare gli elettroliti del programmatore.', 9.50, 'isotonica.jpg', 1, 'Lab Idratazione', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(24, 'Antimateria Pork', 'Se tocca la variante normale, il tuo stomaco si annichilisce.', 25.00, 'antimatter.jpg', 1, 'CERN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(25, 'Porchetta Open Source', 'La ricetta è pubblica, ma nessuno riesce a rifarla uguale a casa.', 12.50, 'opensource.jpg', 1, 'Linux Foundation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(26, 'DNA Helix Pork', 'Doppia elica di carne e grasso legata da ponti di idrogeno al pepe nero.', 16.80, 'dna.jpg', 1, 'Nucleo Cellulare', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(27, 'Supernova Pork', 'Un esplosione stellare di sapore che collassa in una stella di neutroni.', 23.00, 'supernova.jpg', 1, 'Via Lattea', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(28, 'Porchetta Pi-Greco', 'Costa esattamente 3.14 euro all etto. Infinita e non ripetitiva.', 14.15, 'pi.jpg', 1, 'Circonferenza Perfetta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- 4. ASSOCIAZIONE PRODOTTI - CATEGORIE (Tabella Pivot - Rimosso legame per product_id = 8)
INSERT INTO `product_category` (`product_id`, `category_id`) VALUES
(1, 2),  (2, 7),  (3, 3),  (4, 6),  (5, 6),  (6, 9),  (7, 6),
(9, 5),  (10, 7), (11, 5), (12, 5), (13, 8), (14, 8), (15, 5), (16, 5),
(17, 12), (18, 9), (19, 11), (20, 7), (21, 10), (22, 5), (23, 1), (24, 8),
(25, 5), (26, 9), (27, 10), (28, 11);

-- 5. INSERIMENTO RECENSIONI (Iniziali + Blocco 2 + Ulteriori recensioni, ID 8 escluso)
INSERT INTO `reviews` (`id`, `name`, `title`, `review_content`, `date`, `rating`, `product_id`) VALUES
(1, 'User_Aerodinamico', 'Volo perfetto!', 'Mi è volata dritta in bocca con un angolo di 45 gradi. Coefficiente di penetrazione del sugo eccezionale!', '2026-06-01 20:00:00', 5, 1),
(2, 'Marie_Curie99', 'Esperienza radiosa', 'Ottima, ma adesso brillo al buio. Mio marito dice che risparmiamo sulla bolletta della luce.', '2026-06-02 21:15:00', 4, 2),
(3, 'Linus_Fan', 'Efficienza O(1)', 'Mangiati in tempo lineare O(1). Struttura dati croccante ed efficiente.', '2026-06-03 19:30:00', 5, 3),
(4, 'Stephen_H', 'Universo di sapore', 'Ha generato un campo gravitazionale nel mio stomaco. Ho dovuto ordinare un amaro per digerire la singolarità.', '2026-06-04 22:00:00', 5, 4),
(5, 'Doctor_Who', 'Paradosso gustoso', 'L ho mangiata ieri, ma ho iniziato a digerirla la settimana scorsa. Fantastico paradosso temporale.', '2026-06-05 13:00:00', 4, 5),
(6, 'Mendel_Piselli', 'Mutazione eccellente', 'Dopo averla mangiata mi è cresciuto un terzo braccio. Comodo per programmare e mangiare contemporaneamente.', '2026-06-06 20:45:00', 5, 6),
(7, 'Rick_C137', 'Voto dal multiverso', 'In questa dimensione non sanno fare la pizza, ma questa porchetta interdimensionale supera l esame di ammissione.', '2026-06-07 23:00:00', 5, 7),
(9, 'Junior_Dev', 'Zero Errori', 'Il mio primo piatto in questo ristorante. Ha compilato senza errori al primo colpo!', '2026-06-09 19:00:00', 5, 9),
(10, 'Chimico_Pazzo', 'Attenzione al metano', 'Legami covalenti perfetti tra il grasso e il pepe. Attenzione alle flatulenze di metano nel post-serata.', '2026-06-10 14:00:00', 3, 10),
(11, 'SysAdmin_Inka', 'Piatto introvabile', 'Ho cercato il piatto per mezz ora. Il cameriere insisteva che fosse sul tavolo. Errore 404: Pork not found.', '2026-06-10 15:30:00', 2, 11),
(12, 'Database_Master', 'Cancellato subito', 'Ho fatto una DELETE sul piatto in meno di 3 secondi. Record rimosso con successo.', '2026-06-10 16:00:00', 5, 12),
(13, 'Erwin_S', 'Equazione risolta', 'Finché non ho aperto la crosta non sapevo se fosse buona o cattiva. Era buonissima, l equazione è risolta.', '2026-06-10 16:30:00', 5, 13),
(14, 'String_Theorist', 'Sinfonia di dimensioni', 'Le 11 dimensioni vibravano tutte daccordo sul sapore del rosmarino.', '2026-06-10 17:00:00', 4, 14),
(15, 'Johnny_Silverhand', 'Sapore glitchato', 'Porchetta cyberpunk con glitch di sapore. Abbiamo una città da bruciare, e un panino da finire.', '2026-06-10 17:15:00', 5, 15),
(16, 'Senior_Dev', 'Troppa RAM occupata', 'Troppa carne. Ha superato la capacità del mio stomaco e ho dovuto allocare memoria dinamica sul divano.', '2026-06-10 17:30:00', 4, 16),
(17, 'Anacleto_Caveman', 'Sazia primitivo', 'Ugh! Crosta dura come pietra di focolare. Me piace, me sazia, me fa sentire uomo primitivo.', '2026-06-10 17:45:00', 4, 17),
(18, 'Bio_Student', 'Energia pura', 'Ha dato più ATP questa porchetta alle mie cellule che sei tazze di caffè durante la sessione esami.', '2026-06-10 18:00:00', 5, 18),
(19, 'Leonhard_Euler', 'Rapporto aureo', 'La proporzione tra magro e grasso rispetta il rapporto aureo. Matematica pura applicata al colesterolo.', '2026-06-10 18:15:00', 5, 19),
(20, 'H2O_Man', 'Antipasto leggero', 'Leggera, volatile, ma con un retrogusto di maiale ancestrale. Ottimo antipasto atomico.', '2026-06-10 18:30:00', 4, 20),
(21, 'Hubble_Eye', 'Mistero pesante', 'Non la vedi, non la spieghi, ma la senti tutta sullo stomaco. Massa oscura deliziosa.', '2026-06-10 18:45:00', 4, 21),
(22, 'Git_Master', 'Push forzato', 'Ha ignorato i conflitti con la mia dieta e ha fatto il push dritto nel mio esofago. Sovrascritto tutto.', '2026-06-10 19:00:00', 5, 22),
(23, 'Sportivo_HiTech', 'Dissetante ma strano', 'Dissetante, sa di sali minerali e grasso di maiale. Perfetto post-maratona di coding.', '2026-06-10 19:15:00', 3, 23),
(24, 'Cern_Scientist', 'Esplosiva', 'Ha toccato il mio panino normale e ha causato un esplosione termonucleare in sala. Valeva la pena rischiare la vita.', '2026-06-10 19:30:00', 5, 24),
(25, 'Richard_Stallman_Fan', 'Libertà di gusto', 'Ho chiesto la ricetta e me l hanno data scritta su un tovagliolo. GNU/Porchetta libera per tutti!', '2026-06-10 19:45:00', 5, 25),
(26, 'Watson_Crick', 'Genoma perfetto', 'La doppia elica di carne era così perfetta che volevo mapparne il genoma prima di masticarla.', '2026-06-10 20:00:00', 4, 26),
(27, 'Astronoma_Golosa', 'Collasso stellare', 'Un collasso di sapore stellare. Ha illuminato la mia serata prima di farmi cadere in un sonno profondo.', '2026-06-10 20:15:00', 5, 27),
(28, 'Archimede_90', 'Irrazionale ma buona', 'Ho mangiato un numero infinito di fette e non c era mai una fine. Rapporto qualità/prezzo irrazionale.', '2026-06-10 20:30:00', 5, 28),
(29, 'Bio_Student_2', 'Respirazione cellulare bloccata', 'Doveva darmi energia, invece ha rallentato il mio ciclo di Krebs. Pesantezza mitocondriale.', '2026-06-11 10:00:00', 2, 18),
(30, 'SysAdmin_Down', 'Timeout della cena', 'Ho aspettato 404 secondi, ma il piatto non è mai arrivato al tavolo. Errore grave del server.', '2026-06-11 11:30:00', 1, 11),
(31, 'Algoritmi_Fun', 'Buone ma instabili', 'Struttura O(1) ottima, ma la frittura ha un coefficiente di viscosità troppo alto per i miei gusti.', '2026-06-11 12:15:00', 4, 3),
(32, 'Junior_Dev_B', 'Stack esaurito', 'Porchetta interessante ma ingestibile. Ho avuto un overflow gastrico immediato.', '2026-06-11 13:45:00', 2, 16),
(33, 'Cern_Fan', 'Annichilimento totale', 'Esperienza culinaria subatomica. Sapore che spacca l atomo, da premio Nobel.', '2026-06-11 14:20:00', 5, 24),
(34, 'Marie_Curie_Hater', 'Decadimento radioattivo', 'Metà del panino era a temperatura ambiente, l altra metà emetteva raggi gamma. Ingestibile.', '2026-06-11 15:00:00', 1, 2),
(35, 'Dev_Base', 'Troppo basilare', 'Va bene per iniziare, ma manca di complessità algoritmica. Un semplice Hello World della carne.', '2026-06-11 16:10:00', 3, 9),
(36, 'Math_Lover', 'Trascendente', 'Non sono riuscito a trovare la fine del salume. Continuava all infinito senza ripetersi.', '2026-06-11 17:00:00', 5, 28),
(37, 'Fisico_Sbadato', 'Distorsione errata', 'Ha piegato lo spazio-tempo creando un buco nero nella mia giacca. Pessimo servizio di lavanderia.', '2026-06-11 18:00:00', 2, 5),
(38, 'Erwin_S_2', 'Stato di sovrapposizione', 'All apertura della scatola, la porchetta era sia cruda che bruciata. Un po deluso dalla misurazione.', '2026-06-11 19:30:00', 3, 13),
(39, 'Cosmologo_99', 'Singolarità perfetta', 'Un big bang di sapori che ha espanso i miei confini gastrici. Eccellente densità energetica.', '2026-06-11 20:00:00', 5, 4),
(40, 'Aerodinamica_Fail', 'Atterraggio di fortuna', 'L effetto Magnus ha fallito. Il panino è atterrato direttamente sulla mia camicia pulita.', '2026-06-11 20:30:00', 2, 1),
(41, 'Fibonacci_Fan', 'Successione aurea', 'Ogni strato di grasso e magro segue una bellezza matematica ineccepibile. Masticazione armonica.', '2026-06-11 21:00:00', 5, 19),
(42, 'Cyber_Hater', 'Bug di sistema', 'Il rosmarino al neon mi ha dato un infezione al cyberware. Night City ci ha deluso.', '2026-06-11 21:45:00', 2, 15),
(43, 'Multiverse_Explorer', 'Portali saporiti', 'Ottima, anche se la gravità di questa dimensione rende difficile sollevare il piatto.', '2026-06-11 22:30:00', 4, 7),
(44, 'Junior_DBA', 'Database corrotto', 'Creare e leggere è stato facile, ma l Update ha causato un indigestione irreversibile. Non farò il Delete.', '2026-06-11 23:00:00', 1, 12),
(45, 'Git_Expert', 'Sovrascrittura riuscita', 'Ha fatto il commit direttamente nel mio intestino. Ha ignorato ogni conflitto della mia gastrite.', '2026-06-11 23:30:00', 5, 22),
(46, 'Paleo_Diet', 'Cottura paleolitica', 'Crosta troppo dura per i miei molari evoluti. Sa di caverna ma è un po rustica.', '2026-06-12 09:00:00', 3, 17),
(47, 'Open_Source_Dev', 'Fork eccellente', 'Ho clonato il panino, ho aggiunto un pizzico di sale e ho fatto il pull request al mio stomaco.', '2026-06-12 10:15:00', 5, 25),
(48, 'Chimico_Bombarolo', 'Reazione esotermica', 'Ha generato una combustione incontrollata nel tratto digerente. Sconsigliato agli organismi biologici.', '2026-06-12 11:00:00', 1, 10),
(49, 'Astrophysicist_85', 'Massa critica superata', 'La densità di gusto di questo piatto ha causato il collasso del mio apparato digerente. Eccellente.', '2026-06-13 12:00:00', 5, 4),
(50, 'Cosmo_Nauta', 'Buchi neri nel menu', 'Un esperienza culinaria cosmica, la crosta è densa come una nana bianca.', '2026-06-13 13:30:00', 4, 4),
(51, 'Galileo_Pork', 'Eppur si mastica', 'Osservando la struttura molecolare di questo pezzo, non posso che confermare la sua bontà.', '2026-06-13 14:15:00', 5, 4),
(52, 'Prof_Oak', 'Il Big Pork ancestrale', 'Un pezzo di storia della cucina. Consiglio di accompagnarlo con un vino a pH controllato.', '2026-06-13 15:00:00', 4, 4),
(53, 'Web_Dev_Master', 'Implementazione perfetta', 'Create, Read, Update e Delete eseguiti in un sol boccone. Ottima transazione.', '2026-06-13 15:45:00', 5, 12),
(54, 'Frontend_Sucks', 'Nessun errore 500', 'Interfaccia croccante, backend succoso. Nessun rallentamento nel parsing.', '2026-06-13 16:30:00', 4, 12),
(55, 'Backend_Cod', 'CRUD completato', 'Ho effettuato il fetch di questo piatto ed è stato subito inserito nella cache del mio stomaco.', '2026-06-13 17:00:00', 5, 12),
(56, 'FullStack_99', 'Database normalizzato', 'La quantità di pepe è perfettamente normalizzata rispetto alla quantità di grasso.', '2026-06-13 17:30:00', 4, 12),
(57, 'Debug_Man', 'Crash digestivo', 'Troppo pesante, ho dovuto terminare il processo (kill) con una lunga camminata.', '2026-06-13 18:00:00', 2, 16),
(58, 'Exception_Handler', 'Memoria insufficiente', 'Ho tentato di allocare troppa carne nel mio stack gastrico. Eccezione non gestita.', '2026-06-13 18:30:00', 1, 16),
(59, 'Code_Reviewer', 'Stack trace illeggibile', 'Il sapore è così complesso che sembra un log di errore dopo un crash di sistema.', '2026-06-13 19:00:00', 3, 16),
(60, 'Memory_Leak', 'Perdita di memoria', 'Ho mangiato così tanto che non ricordo più come mi chiamo. Ottima porchetta, ma devastante.', '2026-06-13 19:30:00', 4, 16),
(61, 'Compiler_Error', 'Errore di compilazione', 'Il grasso non è riuscito a collegarsi al magro. Digestione fallita a tempo di compilazione.', '2026-06-13 20:00:00', 1, 16),
(62, 'Archimede_2', 'Area del cerchio perfetta', 'Il rapporto tra la crosta e il sugo è esattamente 3.14. Irrazionalmente buona.', '2026-06-13 20:30:00', 5, 28),
(63, 'Geometra_Pazzo', 'Spigoli arrotondati', 'Nonostante il nome, la geometria di questo panino è incredibilmente armonica al palato.', '2026-06-13 21:00:00', 4, 28),
(64, 'Matematico_Triste', 'Serie infinita', 'Continuo a mangiarla e non converge mai verso la fine. Una gioia per l infinto.', '2026-06-13 21:30:00', 5, 28),
(65, 'Fibonacci_Nerd', 'Sezione aurea del sugo', 'Masticazione che segue perfettamente la spirale logaritmica.', '2026-06-13 22:00:00', 4, 28),
(66, 'Aerodinamica_2', 'Volo planato', 'Il cameriere ha lanciato il piatto, ma stavolta c era troppo vento. Peccato.', '2026-06-13 22:30:00', 2, 1),
(67, 'Chernobyl_2', 'Radioattività eccessiva', 'Il contatore Geiger è impazzito sul tavolo. Sapore forte, ma rischio di avvelenamento.', '2026-06-13 23:00:00', 2, 2),
(68, 'Quantum_Hater', 'Stato confuso', 'Non ho capito se era maiale o pollo. La fisica quantistica non si applica ai panini.', '2026-06-14 09:00:00', 2, 13),
(69, 'Localhost_User', 'Connessione rifiutata', 'Un semplice Hello World, ma il pane era un po raffermo sul server locale.', '2026-06-14 10:00:00', 3, 9),
(70, 'Bot_Test', 'Integrazione superba', 'Il piatto si integra perfettamente con il mio framework interno.', '2026-06-14 11:00:00', 4, 9),
(71, 'Cyber_99', 'Innesti cibernetici', 'Il rosmarino al neon dona un retrogusto metallico molto interessante.', '2026-06-14 12:00:00', 5, 15),
(72, 'Paleo_2', 'Fuoco e fiamme', 'Crosta croccante come un osso preistorico. Mi ha salvato dalla carestia.', '2026-06-14 13:00:00', 4, 17),
(73, 'Atomo_Man', 'Fissione gustativa', 'Una reazione nucleare controllata direttamente nel cavo orale.', '2026-06-14 14:00:00', 5, 2),
(74, 'String_2', 'Undicesima dimensione', 'Il finocchietto vibra in armonia con le stringhe cosmiche.', '2026-06-14 15:00:00', 4, 14),
(75, 'Dark_Nerd', 'Massa oscura notevole', 'Non si vede cosa c è dentro la piadina ma riempie come se fossero 3 cene.', '2026-06-14 16:00:00', 4, 21),
(76, 'Senza_Git', 'Push riuscito', 'Anche senza --force, questo panino è entrato subito in produzione.', '2026-06-14 17:00:00', 5, 22),
(77, 'Ph_Control', 'Isotonico ma salato', 'Un po troppo sodio per i miei elettroliti, ma nel complesso bilanciato.', '2026-06-14 18:00:00', 3, 23),
(78, 'Antimatter_2', 'Annichilimento evitato', 'Ho evitato che toccasse il panino normale, per fortuna. Ottimo sapore.', '2026-06-14 19:00:00', 5, 24);