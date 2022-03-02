import axios from "./url";
import { actions } from "../Context/reducer";
import { errorHandler } from "./errorHandler";

const url = "tareas";
export const tareasAPI = {
  fetchTareasTodas: async function (dispatch) {
    try {
      let { data } = await axios.get(url);
      let dataPayload = data.map((item) => {
        return {
          id: item._id,
          descripcion: item.descripcion,
          completada: item.completada,
        };
      });
      dispatch({ type: actions.FETCH, payload: dataPayload });
      return dataPayload;
    } catch (error) {
      await errorHandler(error, dispatch, "FETCH ALL TASKS");
    }
  },
  /*---------------------------------DELETEEEEE--------------*/
  borrarTarea: async function (id, dispatch) {
    try {
      dispatch({ type: actions.START_ACTION });
      await axios.delete(url + `/${id}`);
      dispatch({ type: actions.REMOVE, payload: id });
      return;
    } catch (error) {
      errorHandler(error, dispatch, "BORRAR TAREA");
    }
  },
  guardarTareaPost: async function (input, dispatch) {
    try {
      dispatch({ type: actions.START_ACTION });
      const {
        data: { _id: id, descripcion, completada },
      } = await axios.post(url, input);
      dispatch({ type: actions.ADD, payload: { id, descripcion, completada } });
      return;
    } catch (error) {
      errorHandler(error, dispatch, "GUARDAR TAREA");
    }
  },
  actualizarTarea: async function (id, itemAActualizar, dispatch) {
    dispatch({ type: actions.START_ACTION });
    try {
      await axios.patch(
        url + `/${id}`,

        itemAActualizar
      );
      dispatch({ type: actions.UPDATE, payload: { ...itemAActualizar, id } });
      return;
    } catch (error) {
      errorHandler(error, dispatch, "ACTUALIZAR");
    }
  },
};
