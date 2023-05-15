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

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile ,review_count, review_rating)
VALUES ('에페소', 'Effen', '부드러운 맛과 향을 지닌 프리미엄 보드카', 35000, 700, 35, '네덜란드', '천연 향료', '깔끔한 맛', '보드카', 32, 20, 15, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/effen-rose-vodka.png','0','0.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('스미노프 레드', 'Smirnoff', '대표적인 보드카의 대명사', 16000, 750, 750, '러시아', '보리', '깔끔한 맛', '보드카', 22, 150, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/vodka-smirnoff-vat-69-thumbnail.png','4','2.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('앱솔루트', 'Absolut', '맛과 향을 최대한 살린 보드카', 28000, 700, 700, '스웨덴', '보리', '부드러운 맛', '보드카', 17, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/absolut-vodka-thumbnail.png','2','5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('잭 다니엘스', 'Jack Daniels', '미국의 대표적인 버번 위스키', 50000, 700, 700, '미국', '바닐라, 메이플', '깊은 풍미', '위스키', 10, 80, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/jack-daniels-bottle.png','15','4.8');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('매카랜', 'Macallan', '최고급 스코틀랜드 위스키', 80000, 700, 700, '스코틀랜드', '캐러멜, 과일', '부드러운 맛', '위스키', 3, 30, 20, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/macallan-distillery-single-malt-whisky-whiskey-scotch-whisky-wine-whiskey-cask-distilled-beverage-wine-barrel.png','10','4.2');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('말리부', 'Malibu', '코코넛 맛이 특징인 라미네이트 럼', 24000, 700, 20, '바베이도스', '코코넛', '달콤한 맛', '럼', 55, 30, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/malibu.png', '0', '0.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('스미노프 블루', 'Smirnoff Blue', '청량한 맛과 향이 특징인 보드카', 25000, 750, 750, '러시아', '알코올', '매운 맛', '보드카', 40, 25, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/smirnoffblue.png','4','5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('벨벳 블랙', 'Velvet Black', '부드러운 맛과 진한 향이 특징인 위스키', 30000, 700, 700, '스코틀랜드', '차', '달콤한 맛', '위스키', 30, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/black+velvet.png','12','4.7');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('론디아즈', 'RonDiaz', '코코넛 향이 특징인 럼', 18000, 750, 750, '바베이도스', '코코넛', '달콤한 맛', '럼', 47, 35, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/rondiaz.png','3','4.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile,review_count, review_rating)
VALUES ('레드 스트라이프', 'Red Stripe', '자연스러운 맛이 특징인 제조 방식의 다른 맥주', 8000, 330, 355, '자메이카', '보리', '빈티지한 맛', '맥주', 22, 20, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/RedStripe.png', '4','4.8');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('바카디 파인애플', 'Bacardi PainApple', '담백하면서도 진한 맛과 향을 지닌 파인애플향 보드카', 18000, 700, 700, '러시아', '파인애플', '신선한 맛', '보드카', 31, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/bacardi.png', '2', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('깔루아', 'Kahlua', '커피향이 나는 리큐르', 25000, 700, 700, '러시아', '커피', '달달한 맛', '리큐르', 59, 10, 20, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/kahlua.png', '1', '5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('화요25', 'Hwayo', '한국전통주 화요', 28000, 375, 41, '대한민국', '적고소한 향', '달콤하고 부드러운 맛', '전통주', 24, 20, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/HWAYO_25.png', '2', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('짐빔 화이트', 'Jim Beam White', '밀, 옥수수의 풍미를 가진 버번 위스키', 30000, 1000, 700, '미국', '밀', '달콤하고 부드러운 맛', '버번 위스키', 38, 5, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/jimbeam.png', '2', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('커티 삭', 'Cutty Sark', '맛있는 스카치 위스키', 32000, 1000, 700, '스코틀랜드', '과일', '부드러운 맛', '스카치 위스키', 6, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/Cutty_Sark.png', '1', '5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('미다이 위스키', 'Midori Whiskey', '과일향이 나는 위스키', 20000, 700, 700, '일본', '과일', '부드러운 맛', '위스키', 11, 5, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/midai.png', '3', '4.3');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('클렌피딕', 'Klenfedik', '고급스러운 위스키의 대명사', 110000, 700, 700, '스코틀랜드', '복숭아와 과일', '부드러운 맛', '위스키', 12, 10, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/glenfiddich.png', '1', '5.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('아페롤', 'Aperol', '허브와 오렌지 향의 캄파리와 달리 씁쓸한 맛의 아페리티프', 14000, 700, 700, '이탈리아', '오렌지', '씁쓸한 맛', '아페리티프', 23, 50, 10, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/Aperol.png', '1', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('예거마이스터', 'Jägermeister', '허브와 스파이스의 향이 느껴지는 독일의 전통적인 리큐어', 25000, 700, 35, '독일', '허브와 스파이스', '씁쓸한 맛', '리큐어', 88, 100, 0, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/jager.png', '1', '4.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('빌라 욜란다 모스카토 다스티', 'Villa Yolanda Moscato D Asti', '이탈리아의 피에몬테 지방에서 만들어지는 스파클링 와인. 화사한 꽃향과 달콤한 맛이 특징이다.', 18000, 750, 5, '이탈리아', '꽃', '달콤한 맛', '디저트 와인', 41, 20, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/VillaJolanda.png', '3', '4.7');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('글렌 스코샤 더블 캐스크', 'Glen Scotia Double Cask', '두 가지 다른 오크통에서 숙성한 글렌 스코샤 위스키로 달콤하고 부드러운 맛과 풍부한 아로마를 느낄 수 있습니다.', 66000, 700, 46, '스코틀랜드', '과일, 허브', '달콤하고 부드러운 맛', '싱글몰트 위스키', 23, 30, 15, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/glenscotia.png', '2', '4.5');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('제갈량가주', 'Jegalryang Rice Wine', '쌀의 순도와 깨끗한 맛이 일품인 제갈량가주입니다. 국내산 쌀만을 사용하여 산미와 달콤한 맛이 일품입니다.', 20000, 750, 16, '한국', '쌀', '산미와 달콤한 맛', '쌀주', 7, 100, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/Jegalryang.png', '5', '4.0');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('아키토라 준마이 다이긴죠', 'Akitora Junmai Daiginjo', '귀한 순도 50% 이상의 쌀로 만든 깨끗하고 깊은 맛의 일본 전통 막걸리입니다.', 44000, 720, 15, '일본', '과일, 꽃', '깨끗하고 깊은 맛', '막걸리', 3, 40, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/akitora-jun-maida.png', '3', '4.8');

INSERT INTO item (title_kor, title_eng, content, price, capacity, volume, country, aroma, taste, field, sales, quantity, discount_rate, profile, review_count, review_rating)
VALUES ('와일드 터키 101 1L', 'Wild Turkey 101 1L', '찐하고 무거운 맛이 특징인 위스키입니다. 고급스러운 맛과 향의 완성도를 자랑합니다.', 40000, 1000, 50, '미국', '버터 스카치, 바닐라', '찐하고 무거운 맛', '버번 위스키', 9, 20, 5, 'https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/item/wild-turkey.png', '3', '4.0');

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

INSERT INTO  FAVORITE (favorite_id, item_id, member_id)
VALUES (1, 1,1),
       (2, 2,1),
       (3, 3,1),
       (4, 4,1),
       (5, 5,1),
       (6, 6,1),
       (7, 7,1),
       (8, 8,1),
       (9, 9,1),
       (10, 10,1),
       (11, 11,1),
       (12, 12,1),
       (13, 13,1);

INSERT INTO ITEM_CART (ITEM_CART_ID ,QUANTITY ,CART_ID, ITEM_ID)
VALUES (1,2, 101,3),
       (2,1,101,5),
       (3,3, 101,7);


INSERT INTO MARKET (market_id, name, phone, address, work_Time, comment)
VALUES
    ('1', '고래맥주창고 하안점', '0507-1305-0730', '서울 광명시 하안동', '오후 5시 영업', '매주 월요일 휴무'),
    ('2', '고래맥주창고 독산점', '0507-1362-1706', '서울 금천구 독산동', '오후 4시 영업', '매주 월요일 휴무'),
    ('3', '고래맥주창고 오류점', '0507-1420-3528', '서울 구로구 오류동', '오후 7시 10분 영업', '매주 월요일 휴무'),
    ('4', '고래맥주창고 노량진점', '02-3280-1078', '서울시 동작구 노량진동', '오후 5시 영업', '매주 월요일 휴무'),
    ('5', '고래맥주창고 평촌도서관점', '0507-1394-2884', '안양시 동안구 관양동', '오후 5시 영업', '매주 월요일 휴무'),
    ('6', '고래맥주창고 단원점', '0507-1346-3101', '안산 단원구 원곡동', '오후 5시 영업', '매주 월요일 휴무'),
    ('7', '고래맥주창고 부평구청점', '0507-1330-3567', '인천 부평구 청천동', '오후 4시 영업', '매주 월요일 휴무'),
    ('8', '고래맥주창고 마곡점', '0507-1386-6553', '서울 강서구 마곡동', '오전 11시 오픈', '매주 월요일 휴무'),
    ('9', '고래맥주창고 은평새절점', '010-3914-2904', '서울 은평구 신사동', '오후 5시 영업', '매주 월요일 휴무'),
    ('10', '고래맥주창고 가좌점', '0507-1426-3359', '서울 서대문구 남가좌동', '오후 3시 영업', '매주 월요일 휴무'),
    ('11', '고래맥주창고 종암점', '070-8729-2345', '서울특별시 성북구 종암동', '오후 5시 영업', '매주 월요일 휴무'),
    ('12', '고래맥주창고 인천테크노밸리점', '0507-1331-5834', '인천 부평구 갈산동', '오후 2시 영업', '매주 월요일 휴무'),
    ('13', '고래맥주창고 간석점', '010-5899-4750', '인천 남동구 간석동', '오후 5시 오픈', '매주 월요일 휴무'),
    ('14', '고래맥주창고 도내점', '0507-1316-2655', '고양시 덕양구 도내동', '오후 4시 영업', '매주 월요일 휴무'),
    ('15', '고래맥주창고 인천시청점', '0507-1366-1520', '인천 남동구 구월동', '오후 2시 영업', '매주 월요일 휴무');