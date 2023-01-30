export const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  }
];

export const invalidMatch = {
  homeTeamId: 2,
  homeTeamGoals: 4,
  awayTeamId: 2,
  awayTeamGoals: 5,
};

export const matchWithInvalidTeam = {
  homeTeamId: 200,
  homeTeamGoals: 4,
  awayTeamId: 1,
  awayTeamGoals: 2,
};

export const validMatch = {
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 3,
  awayTeamGoals: 4,
};

export const createdMatch = {
  id: 3,
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 3,
  awayTeamGoals: 4,
  inProgress: true,
};

export const matchToEdit = {
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const editedMatch = {
  id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
};