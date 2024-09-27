import Swal from 'sweetalert2';

export const useAlert = () => {
  const notLoggedInTaskPage = () => {
    Swal.fire({
      titleText: 'WARNING',
      text: 'Please, log in to be able to see the Tasks page.',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#00c90a',
    });
  };

  return {
    notLoggedInTaskPage,
  };
};

export default useAlert;
