import axios from "./url";
const url = "tareas";
export const tareasAPI = {
  config: (token) => {
    return { headers: { auth: token } };
  },
  fetchTareasTodas: async (token) => {
    let { data } = await axios.get(url, tareasAPI.config(token));
    return data.map((item) => {
      return {
        id: item._id,
        descripcion: item.descripcion,
        completada: item.completada,
      };
    });
  },
  borrarTarea: async (id, token) => {
    const { data } = axios.delete(url + `/${id}`, tareasAPI.config(token));
    return data;
  },
  guardarTareaPost: async ({ descripcion }, token) => {
    const { data } = await axios.post(
      url,
      { descripcion },
      tareasAPI.config(token)
    );
    return data;
  },
  actualizarTarea: async (id, itemAActualizar, token) => {
    let { data } = await axios.patch(
      url + `/${id}`,

      itemAActualizar,
      tareasAPI.config(token)
    );
    return data;
  },
};
