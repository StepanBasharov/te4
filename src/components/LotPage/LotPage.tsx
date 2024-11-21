import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./LotPage.style.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { User } from "../../types/user.type";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 100,
  },
  {
    field: "user_name",
    headerName: "Ник пользователя",
    width: 450,
  },
];

function LotPage() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedLots, setSelectedLots] = useState<number[]>([]); //массив id выбранных в чекбоксах пользаков
  const [users, setUsers] = useState<User[]>([]); //пользаки
  const [winnersList, setWinnersList] = useState<User[]>([]); //победители
  const [showWinners, setShowWinners] = useState<boolean>(false);

  //GET-запрос на получение победителей
  const getWinners = () => {
    api
      .getLotWinners(Number(lotId))
      .then((r) => {
        setWinnersList(r.users);
      })
      .catch((er) => console.log(er));
  };

  //POST-запрос на добавление победителей
  const setWinners = () => {
    const data = {
      lot_id: Number(lotId),
      users_ids: selectedLots,
    };

    api
      .setWinners(data)
      .then(() => {
        getWinners();
      })
      .catch((er) => console.error(er));

    setSelectedLots([]);
  };

  //получение всех пользаков и победителей при загрузке страницы
  useEffect(() => {
    api
      .getLotUsers(Number(lotId))
      .then((r) => {
        setUsers(r.users);
      })
      .catch((er) => console.error(er));

    getWinners();

    return () => {
      setUsers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotId, location]);

  return (
    <main className="lot-page">
      <div className="lot-title">
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <h1>{location.state.name ? location.state.name : "Название лота"}</h1>
      </div>
      <div className="button">
        {
          <Button
            onClick={setWinners}
            variant="contained"
            disabled={!(selectedLots.length > 0)}
            sx={{
              visibility: showWinners ? "hidden" : "visible",
              opacity: showWinners ? "0" : "1",
              transition: "all .3s ease",
            }}
          >
            Установить победителей
          </Button>
        }
        <Button
          variant={showWinners ? "contained" : "outlined"}
          onClick={() => {
            setShowWinners(!showWinners);
            setSelectedLots([]);
          }}
        >
          {showWinners ? "Список победителей" : "Все участники"}
        </Button>
      </div>
      <div className="users">
        <Paper>
          <DataGrid
            rows={showWinners ? winnersList : users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={!showWinners}
            disableRowSelectionOnClick
            onRowSelectionModelChange={(data) => {
              setSelectedLots(data as number[]);
            }}
            rowSelectionModel={selectedLots}
          />
        </Paper>
      </div>
    </main>
  );
}

export default LotPage;
