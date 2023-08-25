
export const CARREGAR_LEMBRETES = 'CARREGAR_LEMBRETES';

export const carregarLembretes  = (lembrete) => ({
  type: CARREGAR_LEMBRETES,
  payload: lembrete,
});
