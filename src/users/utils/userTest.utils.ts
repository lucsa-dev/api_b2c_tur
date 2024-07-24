class UserTestMock {
  public generateMock(): any {
    const id = 1;
    const email = 'josh@gmail.com';
    const createdAt = new Date();
    const updatedAt = new Date();

    return {
      id,
      email,
      name: 'josh doe',
      cpf: '040.199.951.33',
      phone: '85994949494',
      role: 'USER',
      createdAt,
      updatedAt,
    };
  }
}

export { UserTestMock };
