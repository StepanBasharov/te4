import { Link } from "react-router-dom";
import "./app.style.css";
import { Lot } from "./types/Lot.type";
import { useEffect, useState } from "react";
import api from "./api/api";

function App() {
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    api
      .getAllLots()
      .then((r) => {
        setLots(r.lots);
      })
      .catch((er) => console.error(er));
  }, []);

  return (
    <main className="App">
      <div className="lots">
        {lots.length > 0 &&
          lots.map((lot) => (
            <Link
              to={`/lot/${lot.id}`}
              state={{ name: lot.lot_name }}
              key={lot.id + "_link"}
            >
              <article className="lot" key={lot.id}>
                <h2 className="title" key={lot.id + "_title"}>
                  {lot.lot_name}
                </h2>
                <p className="members" key={lot.id + "_members"}>
                  Кол-во подписчиков <br /> для завершения конкурса:{" "}
                  <b key={lot.id + "_b"}>{lot.members}</b>
                </p>
                <p className="winners" key={lot.id + "_winners"}>
                  Победители: <b key={lot.id + "_b-w"}>{lot.winners_count}</b>
                </p>
                <p className="date" key={lot.id + "_date"}>
                  Дата <br /> окончания конкурса: <b key={lot.id + "_b-d"}>{lot.date.slice(0, 16)}</b>
                </p>
                <p className="check-sub" key={lot.id + "_check-sub"}>
                  Проверка подписки: <b key={lot.id + "_b-check-sub"}>{
                  lot.check_sub ? 'ДА':'НЕТ'
                  }</b>
                </p>
              </article>
            </Link>
          ))}
      </div>
    </main>
  );
}

export default App;
