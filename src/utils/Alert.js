import Swal from "sweetalert2";
export const swalAlert = () => {
  Swal.fire({
    title: " Credenciales invalidas",
    text: "Por favor introduzca credenciaales validas",
    confirmButtonText: "Aceptar",
    width: "400px",
    timer: 10000,
    timerProgressBar: true,
  });
};
