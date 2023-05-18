INSERT INTO CART (cart_id, total_price, total_quantity)
VALUES (101, 211000,6),
       (102, 0,0);

INSERT INTO member (real_name, display_name, email, password, phone, birth_date, mail_key, password_issued ,oauth2registered ,member_status, cart_id)
VALUES ('홍길동', '길동', 'admin@gmail.com', '{bcrypt}$2a$10$DMjG9h.SPH/1bGNTwkqGIer/zvubR//qasrkLdLin3cNDDOmZzW96', '010-1234-5678', '1990-01-01', null,false,false, 'MEMBER_ACTIVE',101),
       ('테스트', '테테', 'test@gmail.com', '{bcrypt}$2a$10$DMjG9h.SPH/1bGNTwkqGIer/zvubR//qasrkLdLin3cNDDOmZzW96', '010-1234-5678', '1990-01-01', null,false,false, 'MEMBER_ACTIVE',102);
INSERT INTO member_roles (member_member_id, roles)
VALUES (1, 'USER'),
       (1, 'ADMIN'),
       (2, 'USER');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, detailed_Profile ,review_count, review_rating)
VALUES ('에펜', 'Effen', '부드러운 맛과 향을 지닌 프리미엄 보드카', 35000, 700, 35, '네덜란드', '천연 향료', '깔끔한 맛', '보드카', 32, 20, 15, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/1.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/1.jpg','0','0.0'),
('스미노프 레드', 'Smirnoff', '대표적인 보드카의 대명사', 16000, 750, 37.5, '러시아', '보리', '깔끔한 맛', '보드카', 22, 150, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/2.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/2.jpg','4','2.5'),
('앱솔루트 보드카', 'Absolut', '맛과 향을 최대한 살린 보드카', 28000, 700, 40, '스웨덴', '보리', '부드러운 맛', '보드카', 17, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/3.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/3.jpg','2','5.0'),
('잭 다니엘스', 'Jack Daniels', '미국의 대표적인 버번 위스키', 50000, 700, 35, '미국', '바닐라, 메이플', '깊은 풍미', '위스키', 10, 80, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/4.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/4.jpg','15','4.8'),
('매카랜', 'Macallan', '최고급 스코틀랜드 위스키', 80000, 700, 40, '스코틀랜드', '캐러멜, 과일', '부드러운 맛', '위스키', 3, 30, 20, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/5.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/5.jpg','10','4.2'),
('말리부', 'Malibu', '코코넛 맛이 특징인 라미네이트 럼', 24000, 700, 20, '바베이도스', '코코넛', '달콤한 맛', '럼', 55, 30, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/6.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/6.jpg', '0', '0.0'),
('스미노프 블루', 'Smirnoff Blue', '청량한 맛과 향이 특징인 보드카', 25000, 750, 50, '러시아', '알코올', '매운 맛', '보드카', 40, 25, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/7.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/7.jpg','4','5.0'),
('블랙 벨벳', 'Velvet Black', '부드러운 맛과 진한 향이 특징인 위스키', 30000, 700, 40, '스코틀랜드', '차', '달콤한 맛', '위스키', 30, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/8.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/8.jpg','12','4.7'),
('론디아즈 151', 'RonDiaz', '높은 도수가 특징인 럼', 18000, 750, 75.5, '바베이도스', '과일', '향긋한 맛', '럼', 47, 35, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/9.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/9.jpg','3','4.0'),
('레드 스트라이프', 'Red Stripe', '자연스러운 맛이 특징인 제조 방식의 다른 맥주', 8000, 330, 4.7, '자메이카', '보리', '빈티지한 맛', '맥주', 22, 20, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/10.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/10.jpg','4','4.8'),
('바카디 파인애플', 'Bacardi PainApple', '담백하면서도 진한 맛과 향을 지닌 파인애플향 보드카', 18000, 700, 18, '러시아', '파인애플', '신선한 맛', '보드카', 31, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/11.png', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/11.jpg','2', '4.5'),
('깔루아', 'Kahlua', '커피향이 나는 리큐르', 25000, 700, 20, '러시아', '커피', '달달한 맛', '리큐르', 59, 10, 20, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/12.png', 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/12.jpg','1', '5.0'),
('화요25', 'Hwayo', '한국전통주 화요', 28000, 375, 41, '대한민국', '적고소한 향', '달콤하고 부드러운 맛', '전통주', 24, 20, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/13.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/13.jpg' ,'2', '4.5'),
('짐빔 화이트', 'Jim Beam White', '밀, 옥수수의 풍미를 가진 버번 위스키', 30000, 1000, 40, '미국', '밀', '달콤하고 부드러운 맛', '버번 위스키', 38, 5, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/14.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/14.jpg' ,'2', '4.5'),
('커티 삭', 'Cutty Sark', '맛있는 스카치 위스키', 32000, 1000,40, '스코틀랜드', '과일', '부드러운 맛', '스카치 위스키', 6, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/15.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/15.jpg', '1', '5.0'),
('미다이 위스키', 'Midori Whiskey', '과일향이 나는 위스키', 20000, 700, 37, '일본', '과일', '부드러운 맛', '위스키', 11, 5, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/16.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/16.jpg','3', '4.3'),
('글렌피딕', 'Klenfedik', '고급스러운 위스키의 대명사', 110000, 700, 40, '스코틀랜드', '복숭아와 과일', '부드러운 맛', '위스키', 12, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/17.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/17.jpg', '1', '5.0'),
('아페롤', 'Aperol', '허브와 오렌지 향의 캄파리와 달리 씁쓸한 맛의 아페리티프', 14000, 700, 11, '이탈리아', '오렌지', '씁쓸한 맛', '아페리티프', 23, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/18.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/18.jpg','1', '4.5'),
('예거마이스터', 'Jägermeister', '허브와 스파이스의 향이 느껴지는 독일의 전통적인 리큐어', 25000, 700, 35, '독일', '허브와 스파이스', '씁쓸한 맛', '리큐어', 88, 100, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/19.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/19.jpg', '1', '4.0'),
('빌라 욜란다 모스카토 다스티', 'Villa Yolanda Moscato D Asti', '이탈리아의 피에몬테 지방에서 만들어지는 스파클링 와인. 화사한 꽃향과 달콤한 맛이 특징이다.', 18000, 750, 5, '이탈리아', '꽃', '달콤한 맛', '디저트 와인', 41, 20, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/20.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/20.jpg', '3', '4.7'),
('글렌 스코샤 더블 캐스크', 'Glen Scotia Double Cask', '두 가지 다른 오크통에서 숙성한 글렌 스코샤 위스키로 달콤하고 부드러운 맛과 풍부한 아로마를 느낄 수 있습니다.', 66000, 700, 46, '스코틀랜드', '과일, 허브', '달콤하고 부드러운 맛', '싱글몰트 위스키', 23, 30, 15, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/21.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/21.jpg', '2', '4.5'),
('제갈량가주', 'Jegalryang Rice Wine', '쌀의 순도와 깨끗한 맛이 일품인 제갈량가주입니다. 국내산 쌀만을 사용하여 산미와 달콤한 맛이 일품입니다.', 20000, 750, 16, '한국', '쌀', '산미와 달콤한 맛', '쌀주', 7, 100, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/22.png','https://jusinsa-project.s3.ap-northeast-2.amazona2.jpg' ,'5', '4.0'),
('아키토라 준마이 다이긴죠', 'Akitora Junmai Daiginjo', '귀한 순도 50% 이상의 쌀로 만든 깨끗하고 깊은 맛의 일본 전통 막걸리입니다.', 44000, 720, 15, '일본', '과일, 꽃', '깨끗하고 깊은 맛', '막걸리', 3, 40, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/23.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/23.jpg', '3', '4.8'),
('와일드 터키 101 1L', 'Wild Turkey 101 1L', '찐하고 무거운 맛이 특징인 위스키입니다. 고급스러운 맛과 향의 완성도를 자랑합니다.', 40000, 1000, 50, '미국', '버터 스카치, 바닐라', '찐하고 무거운 맛', '버번 위스키', 9, 20, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/24.png','https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/detaliedItem/24.jpg' ,'3', '4.0');

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
       (12, '리큐르'),
       (13, '전통주'),
       (14, '위스키'),
       (15, '위스키'),
       (16, '위스키'),
       (17, '위스키'),
       (18, '아페리티프'),
       (19, '리큐르'),
       (20, '와인'),
       (21, '위스키'),
       (22, '쌀주'),
       (23, '막걸리'),
       (24, '위스키');


INSERT INTO ITEM_CART (ITEM_CART_ID ,QUANTITY ,CART_ID, ITEM_ID)
VALUES (101,2, 101,3),
       (102,1,101,5),
       (103,3, 101,7);


INSERT INTO MARKET (market_id, name, lat, lng, phone, choice, address, work_Time, comment)
VALUES
    ('1', '고래맥주창고 수지구청점', 37.322117581491526, 127.0948747094305, '031-261-0828', false, '경기 용인시 수지구', '오후 5시 영업', '매주 월요일 휴무'),
    ('2', '고래맥주창고 수지죽전점', 37.3254276819496, 127.1136172500424, '031-261-0828', false, '경기 용인시 수지구 대지로', '오후 5시 영업', '매주 월요일 휴무'),
    ('3', '고래맥주창고 분당미금점', 37.35202867164958, 127.11090336715307, '031-261-0828', false, '경기도 성남시 분당구', '오후 5시 영업', '매주 월요일 휴무'),
    ('4', '고래맥주창고 분당서현점', 37.380392455417706, 127.12916874787089, '031-261-0828', false, '성남 분당구 서현동', '오후 5시 영업', '매주 월요일 휴무'),
    ('5', '고래맥주창고 분당수내점', 37.375949905695215, 127.12112694897831, '031-261-0828', false, '성남 분당구 수내동', '오후 5시 영업', '매주 월요일 휴무'),
    ('6', '고래맥주창고 분당이매점', 37.40333696943167, 127.12498853063202, '031-261-0828', false, '성남 분당구 이매동', '오후 5시 영업', '매주 월요일 휴무');

INSERT INTO REVIEW (CREATED_AT, LAST_MODIFIED_AT, CONTENT, RATING, TITLE, ITEM_ID, MEMBER_ID)
VALUES ('2023-05-16 15:46:58.400765', '2023-05-16 15:46:58.400765', '너무 맛있어서 사진 3개 첨부요!', 5.0, '와 맛있당!', 1, 1),
       ('2023-05-16 15:47:34.939605', '2023-05-16 15:47:34.939605', '너무 맛없어서 사진 없어', 2.0, '우웩!', 1, 1),
       ('2023-05-16 15:48:40.414441', '2023-05-16 15:48:40.414441', '싫어요!', 1.0, '맛업서!', 2, 1),
       ('2023-05-16 15:48:57.450179', '2023-05-16 15:48:57.450179', '꿀!', 5.0, '와 맛있당!', 2, 1),
       ('2023-05-16 15:49:30.000000', '2023-05-16 15:49:30.000000', '맛있어요!', 4.0, '맛있어요!', 1, 1),
       ('2023-05-16 15:50:00.000000', '2023-05-16 15:50:00.000000', '별로에요!', 2.5, '별로에요!', 1, 2),
       ('2023-05-16 15:50:30.000000', '2023-05-16 15:50:30.000000', '좋아요!', 4.5, '좋아요!', 1, 2),
       ('2023-05-16 15:51:00.000000', '2023-05-16 15:51:00.000000', '괜찮아요!', 3.0, '괜찮아요!', 1, 2),
       ('2023-05-16 15:51:30.000000', '2023-05-16 15:51:30.000000', '매우 좋아요!', 5.0, '매우 좋아요!', 1, 1),
       ('2023-05-16 15:52:00.000000', '2023-05-16 15:52:00.000000', '별로에요!', 2.0, '별로에요!', 1, 2);


INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (1, '2023-05-16 15:46:58.445765', '2023-05-16 15:46:58.445765', 'review/', '1684219617714_absolut-vodka-thumbnail.png', 'absolut-vodka-thumbnail.png', 1);

INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (2, '2023-05-16 15:46:58.450766', '2023-05-16 15:46:58.450766', 'review/', '1684219618210_bacardi.png', 'bacardi.png', 1);

INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (3, '2023-05-16 15:46:58.451765', '2023-05-16 15:46:58.451765', 'review/', '1684219618282_blackvelvet.png', 'black velvet.png', 1);

INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (4, '2023-05-16 15:48:57.451174', '2023-05-16 15:48:57.451174', 'review/', '1684219737160_absolut-vodka-thumbnail.png', 'absolut-vodka-thumbnail.png', 4);

INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (5, '2023-05-16 15:48:57.451174', '2023-05-16 15:48:57.451174', 'review/', '1684219737241_bacardi.png', 'bacardi.png', 4);

INSERT INTO REVIEW_IMAGE (ITEM_IMAGE_ID, CREATED_AT, LAST_MODIFIED_AT, FILE_PATH, IMAGE_NAME, ORI_NAME, REVIEW_ID)
VALUES (6, '2023-05-16 15:48:57.452174', '2023-05-16 15:48:57.452174', 'review/', '1684219737322_blackvelvet.png', 'black velvet.png', 4);


INSERT INTO orders (CREATED_AT, LAST_MODIFIED_AT, NAME, ORDER_STATUS, PHONE, MARKET_ID, MEMBER_ID , is_Checked)
VALUES
    ('2023-05-16 15:46:58.400765', '2023-05-16 15:46:58.400765', '어드민', 'ORDER_REQUEST', '010-1234-5678', 1, 1, false),
    ('2023-05-06 15:47:34.939605', '2023-05-06 15:47:34.939605', '어드민', 'ORDER_CONFIRM', '010-1234-5678', 2, 1 ,true);


INSERT INTO  FAVORITE (favorite_id, item_id, member_id , is_Checked)
VALUES (100, 1,1,false),
       (102, 2,1,true),
       (103, 3,1,true),
       (104, 4,1,false),
       (105, 5,1,false),
       (106, 6,1,false),
       (107, 7,1,true),
       (108, 8,1,true),
       (109, 9,1,false),
       (110, 10,1,true),
       (111, 11,1,false),
       (112, 12,1,true),
       (113, 13,1,false),
       (114, 14,1,true),
       (115, 15,1,true),
       (116, 16,1,false),
       (117, 17,1,false),
       (118, 18,1,false),
       (119, 19,1,true),
       (120, 20,1,true),
       (121, 21,1,false),
       (122, 22,1,true),
       (123, 23,1,false);



INSERT INTO item_order (quantity, order_id, item_id)
VALUES (2, 1, 1),
       (1, 1, 2),
       (3, 1, 3),
       (4, 2, 8),
       (3, 2, 9),
       (5, 2, 10);