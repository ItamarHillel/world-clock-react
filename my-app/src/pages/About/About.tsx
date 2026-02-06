import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>אודות האפליקציה</h1>
        
        <section className="about-section">
          <h2>📖 סקירה כללית</h2>
          <p>
            שעון עולמי היא אפליקציה פשוטה ואלגנטית להצגת 
            שעות מקומיות בערים מרכזיות ברחבי העולם. בין אם אתה מתאם 
            פגישות עם עמיתים בינלאומיים, מתכננים טיולים, או פשוט סקרנים 
            לגבי השעה במקומות אחרים — האפליקציה מספקת מידע מעודכן במבט אחד.
          </p>
        </section>

        <section className="about-section">
          <h2>✨ תכונות</h2>
          <ul>
            <li>צפייה בשעה המקומית עבור 12+ ערים מרכזיות</li>
            <li>אינדיקציה יום/לילה לפי השעה (🌞 06:00-17:59, 🌙 18:00-05:59)</li>
            <li>תצוגה מפורטת עם מידע על אזור הזמן, הפרש UTC וקיצור</li>
            <li>רענון אוטומטי כל 60 שניות</li>
            <li>אפשרות רענון ידני</li>
            <li>מצב בהיר/כהה לצפייה נוחה</li>
            <li>עיצוב רספונסיבי לכל המכשירים</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🔗 מקור הנתונים</h2>
          <p>
            נתוני השעה מחושבים באמצעות <strong>Intl API</strong> המובנה של JavaScript.
          </p>
          <p className="api-url">
            תקן: <code>IANA Time Zone Database</code>
          </p>
          <p>
            שיטה זו מדויקת, אמינה, ולא תלויה בשרתים חיצוניים. 
            השעות מתעדכנות בזמן אמת לפי אזורי הזמן הרשמיים.
          </p>
        </section>

        <section className="about-section">
          <h2>🛠️ טכנולוגיות</h2>
          <ul>
            <li>React 19 עם TypeScript</li>
            <li>Vite לפיתוח מהיר</li>
            <li>React Router לניווט</li>
            <li>CSS Grid ו-Flexbox לעיצוב רספונסיבי</li>
            <li>Date API מובנה של JavaScript</li>
          </ul>
        </section>

        <footer className="about-footer">
          <p>נבנה עם React + Vite + TypeScript</p>
          <p className="developer-name">פותח על ידי איתמר הלל</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
