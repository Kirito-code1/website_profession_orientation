-- Seed data for career test questions and answers
-- Этот скрипт заполняет базу данных тестовыми вопросами и ответами

-- Создание таблицы users если её нет
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы career_answer если её нет
CREATE TABLE IF NOT EXISTS career_answer (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER,
  answer_text TEXT NOT NULL,
  "order" INTEGER DEFAULT 0
);

-- Создание таблицы saved_proffession если её нет
CREATE TABLE IF NOT EXISTS saved_proffession (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  faculty_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, faculty_id)
);

-- Создание таблицы saved_faculty если её нет
CREATE TABLE IF NOT EXISTS saved_faculty (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  faculty_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, faculty_id)
);

-- Вставка вопросов для теста на профориентацию
INSERT INTO career_question (question_id, question_text, "order", is_active) VALUES
(1, 'Что вам больше нравится делать в свободное время?', 1, true),
(2, 'Какой предмет в школе вам нравился больше всего?', 2, true),
(3, 'Какую работу вы бы предпочли?', 3, true),
(4, 'Что для вас важно в будущей профессии?', 4, true),
(5, 'Как вы решаете сложные задачи?', 5, true),
(6, 'Предпочитаете ли вы работать в команде или в одиночку?', 6, true),
(7, 'Что вас больше вдохновляет?', 7, true),
(8, 'Какой вид творчества вам ближе?', 8, true),
(9, 'Как вы относитесь к новым технологиям?', 9, true),
(10, 'Что вам больше подходит?', 10, true),
(11, 'Как вы проводите выходные?', 11, true),
(12, 'Какой стиль общения вам ближе?', 12, true),
(13, 'Что вам нравится изучать?', 13, true),
(14, 'Какие качества вы цените в себе?', 14, true),
(15, 'Куда вы видите себя через 5 лет?', 15, true)
ON CONFLICT (question_id) DO NOTHING;

-- Вставка вариантов ответов
-- Вопрос 1
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(1, 'Играть в игры, программировать', 1),
(1, 'Рисовать, создавать дизайн', 2),
(1, 'Общаться с друзьями', 3),
(1, 'Читать книги, изучать новое', 4),
(1, 'Заниматься спортом', 5);

-- Вопрос 2
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(2, 'Математика, информатика', 1),
(2, 'ИЗО, музыка, литература', 2),
(2, 'Обществознание, история', 3),
(2, 'Физика, химия', 4),
(2, 'Все предметы были одинаковы', 5);

-- Вопрос 3
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(3, 'Разрабатывать программное обеспечение', 1),
(3, 'Создавать визуальный контент', 2),
(3, 'Управлять проектами', 3),
(3, 'Проводить исследования', 4),
(3, 'Работать с людьми', 5);

-- Вопрос 4
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(4, 'Высокая зарплата', 1),
(4, 'Творческая реализация', 2),
(4, 'Стабильность и уверенность', 3),
(4, 'Помощь другим людям', 4),
(4, 'Карьерный рост', 5);

-- Вопрос 5
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(5, 'Анализирую и ищу логические решения', 1),
(5, 'Использую интуицию и креатив', 2),
(5, 'Обсуждаю с другими', 3),
(5, 'Изучаю информацию подробно', 4),
(5, 'Действую быстро и решительно', 5);

-- Вопрос 6
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(6, 'Предпочитаю работать в одиночку', 1),
(6, 'Люблю командную работу', 2),
(6, 'Чередую оба варианта', 3),
(6, 'Работаю там, где лучше результат', 4),
(6, 'Зависит от задачи', 5);

-- Вопрос 7
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(7, 'Инновации и технологии', 1),
(7, 'Искусство и красота', 2),
(7, 'Социальные изменения', 3),
(7, 'Научные открытия', 4),
(7, 'Бизнес и успех', 5);

-- Вопрос 8
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(8, 'Цифровое искусство, веб-дизайн', 1),
(8, 'Живопись, графика', 2),
(8, 'Музыка, звук', 3),
(8, 'Писательство, тексты', 4),
(8, 'Фотография, видео', 5);

-- Вопрос 9
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(9, 'Обожаю, всегда следую за трендами', 1),
(9, 'Интересно, но не профессионально', 2),
(9, 'Использую по необходимости', 3),
(9, 'Предпочитаю простые решения', 4),
(9, 'Технологии меня не сильно интересуют', 5);

-- Вопрос 10
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(10, 'Аналитика, цифры, данные', 1),
(10, 'Креатив, идеи, концепции', 2),
(10, 'Коммуникация, переговоры', 3),
(10, 'Организация, планирование', 4),
(10, 'Помощь, поддержка', 5);

-- Вопрос 11
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(11, 'Сидю за компьютером', 1),
(11, 'Выхожу на природу, занимаюсь спортом', 2),
(11, 'Встречаюсь с друзьями', 3),
(11, 'Читаю, учусь', 4),
(11, 'Занимаюсь творчеством', 5);

-- Вопрос 12
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(12, 'Прямой и конкретный', 1),
(12, 'Дружелюбный и эмпатичный', 2),
(12, 'Убедительный и энергичный', 3),
(12, 'Спокойный и взвешенный', 4),
(12, 'Креативный и неформальный', 5);

-- Вопрос 13
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(13, 'Как работают технологии', 1),
(13, 'Психология людей', 2),
(13, 'Бизнес и экономика', 3),
(13, 'Искусство и культура', 4),
(13, 'Наука и природа', 5);

-- Вопрос 14
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(14, 'Аналитическое мышление', 1),
(14, 'Творческий подход', 2),
(14, 'Лидерские качества', 3),
(14, 'Коммуникабельность', 4),
(14, 'Терпение и усидчивость', 5);

-- Вопрос 15
INSERT INTO career_answer (question_id, answer_text, "order") VALUES
(15, 'Senior разработчик в IT-компании', 1),
(15, 'Ведущий дизайнер или арт-директор', 2),
(15, 'Руководитель отдела или компании', 3),
(15, 'Эксперт в своей области', 4),
(15, 'Успешный предприниматель', 5);

-- Создание таблицы career_question если её нет
CREATE TABLE IF NOT EXISTS career_question (
  question_id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Пересоздание таблицы career_test_results с правильной структурой
DROP TABLE IF EXISTS career_test_results CASCADE;
CREATE TABLE career_test_results (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER,
  result_category TEXT,
  result_profession TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Обновление RLS политик
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_question ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_answer ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_proffession ENABLE ROW LEVEL SECURITY;

-- Политика для users
DROP POLICY IF EXISTS "Allow users to manage their own profile" ON users;
CREATE POLICY "Allow users to manage their own profile" ON users
  FOR ALL USING (auth.uid() = id);

-- Создание политик для публичного чтения вопросов
DROP POLICY IF EXISTS "Allow public read access to career_question" ON career_question;
CREATE POLICY "Allow public read access to career_question" ON career_question
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to career_answer" ON career_answer;
CREATE POLICY "Allow public read access to career_answer" ON career_answer
  FOR SELECT USING (true);

-- Политика для записи результатов теста
DROP POLICY IF EXISTS "Allow users to insert their own test results" ON career_test_results;
CREATE POLICY "Allow users to insert their own test results" ON career_test_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Политика для чтения своих результатов
DROP POLICY IF EXISTS "Allow users to read their own test results" ON career_test_results;
CREATE POLICY "Allow users to read their own test results" ON career_test_results
  FOR SELECT USING (auth.uid() = user_id);

-- Политика для сохранения факультетов
DROP POLICY IF EXISTS "Allow users to manage their saved faculties" ON saved_faculty;
CREATE POLICY "Allow users to manage their saved faculties" ON saved_faculty
  FOR ALL USING (auth.uid() = user_id);

-- Политика для сохранения профессий
DROP POLICY IF EXISTS "Allow users to manage their saved professions" ON saved_proffession;
CREATE POLICY "Allow users to manage their saved professions" ON saved_proffession
  FOR ALL USING (auth.uid() = user_id);
