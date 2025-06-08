const isManager = (proyectManager: string, userId: string) => {
  return proyectManager === userId;
};

export { isManager };
