INSERT INTO member (real_name, display_name, email, password, phone, birth_date, mail_key, member_status)
VALUES ('홍길동', '길동', 'admin@gmail.com', '{bcrypt}$2a$10$DMjG9h.SPH/1bGNTwkqGIer/zvubR//qasrkLdLin3cNDDOmZzW96', '010-1234-5678', '1990-01-01', null, 'MEMBER_ACTIVE'),
       ('테스트', '테테', 'test@gmail.com', '{bcrypt}$2a$10$DMjG9h.SPH/1bGNTwkqGIer/zvubR//qasrkLdLin3cNDDOmZzW96', '010-1234-5678', '1990-01-01', null, 'MEMBER_ACTIVE');
INSERT INTO member_roles (member_member_id, roles)
VALUES (1, 'ROLE_USER'),
       (2, 'ROLE_USER');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile ,review_count, review_rating)
VALUES ('에페소', 'Effen', '부드러운 맛과 향을 지닌 프리미엄 보드카', 35000, 700, 35, '네덜란드', '천연 향료', '깔끔한 맛', '보드카', '수입 인기 상품', 20, '15%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/effen-rose-vodka.png','0','0.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('스미노프 레드', 'Smirnoff', '대표적인 보드카의 대명사', 16000, 750, 750, '러시아', '보리', '깔끔한 맛', '보드카', '대중적인 상품', 150, '0%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/vodka-smirnoff-vat-69-thumbnail.png','4','2.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('앱솔루트', 'Absolut', '맛과 향을 최대한 살린 보드카', 28000, 700, 700, '스웨덴', '보리', '부드러운 맛', '보드카', '프리미엄 상품', 50, '10%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/absolut-vodka-thumbnail.png','2','5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('잭 다니엘스', 'Jack Daniels', '미국의 대표적인 버번 위스키', 50000, 700, 700, '미국', '바닐라, 메이플', '깊은 풍미', '위스키', '인기 상품', 80, '5%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/jack-daniels-bottle.png','15','4.8');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('매카랜', 'Macallan', '최고급 스코틀랜드 위스키', 80000, 700, 700, '스코틀랜드', '캐러멜, 과일', '부드러운 맛', '위스키', '프리미엄 상품', 30, '20%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/macallan-distillery-single-malt-whisky-whiskey-scotch-whisky-wine-whiskey-cask-distilled-beverage-wine-barrel.png','10','4.2');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('말리부', 'Malibu', '코코넛 맛이 특징인 라미네이트 럼', 24000, 700, 20, '바베이도스', '코코넛', '달콤한 맛', '럼', '여름 분위기', 30, '0%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/malibu.png', '0', '0.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('스미노프 블루', 'Smirnoff Blue', '청량한 맛과 향이 특징인 보드카', 25000, 750, 750, '러시아', '알코올', '매운 맛', '보드카', '인기 있는 상품', 25, '0%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/smirnoffblue.png','4','5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('벨벳 블랙', 'Velvet Black', '부드러운 맛과 진한 향이 특징인 위스키', 30000, 700, 700, '스코틀랜드', '차', '달콤한 맛', '위스키', '한정판 상품', 10, '10%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/black+velvet.png','12','4.7');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('론디아즈', 'RonDiaz', '코코넛 향이 특징인 럼', 18000, 750, 750, '바베이도스', '코코넛', '달콤한 맛', '럼', '새로 출시된 상품', 35, '5%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/rondiaz.png','3','4.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('레드 스트라이프', 'Red Stripe', '자연스러운 맛이 특징인 제조 방식의 다른 맥주', 8000, 330, 355, '자메이카', '보리', '빈티지한 맛', '맥주', '수입 상품', 20, '0%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/RedStripe.png', '4','4.8');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('바카디 파인애플', 'Bacardi PainApple', '담백하면서도 진한 맛과 향을 지닌 파인애플향 보드카', 18000, 700, 700, '러시아', '파인애플', '신선한 맛', '보드카', '술도둑 인기 상품', 50, '10%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/bacardi.png', '2', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('깔루아', 'Kahlua', '커피향이 나는 리큐르', 25000, 700, 700, '러시아', '커피', '달달한 맛', '리큐르', '수입 인기 상품', 10, '20%', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/kahlua.png', '1', '5.0');

INSERT INTO  ITEM_CATEGORIES (item_item_id, categories)
VALUES (1, '보드카'),
       (2, '보드카'),
       (3, '보드카'),
       (4, '위스키'),
       (5, '위스키'),
       (6, '위스키'),
       (7, '보드카'),
       (8, '위스키'),
       (9, '럼'),
       (10, '맥주'),
       (11, '보드카'),
       (12, '리큐르');
