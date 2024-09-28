import Swal from 'sweetalert2';

export const useAlert = () => {
  const notLoggedInTaskPageAlert = () => {
    Swal.fire({
      titleText: 'NOT LOGGED IN',
      text: 'Please, log in to be able to see the Tasks page.',
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#00c90a',
    });
  };

  const logoutAlert = () => {
    Swal.fire({
      titleText: 'LOGGED OUT',
      text: 'Successfully logged out from your acount.',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#00c90a',
    });
  };

  return {
    notLoggedInTaskPageAlert,
    logoutAlert,
  };
};

export default useAlert;
