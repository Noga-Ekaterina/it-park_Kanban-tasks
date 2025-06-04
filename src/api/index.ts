// функции запросов

import axios from "axios";

const postTask  = async (data: FormData) => {
    await axios.post(`/api/boards/${board_id}`)
}