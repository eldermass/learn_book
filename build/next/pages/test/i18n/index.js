import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Child from "./child";
// 3步独立
// 1. 传入react-i18next
// 2. 初始化i18n
// 3. 使用 hoc hook renderProp

// import Backend from 'i18next-xhr-backend'; 从Api获取翻译数据
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        file1: {
          "wel": "Welcome to React and react-i18next"
        },
        file2: {
          "wel": "Welcome to React and react-i18next 222"
        }
      },
      cn:{
        file1: {
          "wel": "欢迎来到英雄联盟"
        },
        file2: {
          "wel": "欢迎来到英雄联盟 222"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

function App() {
  const { t, i18n } = useTranslation();
  return (
    <h2>
      {t("file1:wel")}
      <div>
        <button onClick={() => {
          console.log('changeL')
          i18n.changeLanguage('cn')
        }}>changeL</button>
      </div>
      <Child />
    </h2>
  );
}
export default App;
