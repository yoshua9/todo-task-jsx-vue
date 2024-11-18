declare global {
  type Task = {
    id: string;
    text: string;
    completed: boolean;
  };

  type SnackBar = {
    color: string;
    show: boolean;
    text: string;
    showReload: boolean;
  };
}

export {};
