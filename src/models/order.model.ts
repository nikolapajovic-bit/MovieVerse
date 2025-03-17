export interface OrderModel {
  id: number;
  movieId: number;
  movieTitle: string;
  startDate: string;
  count: number;
  pricePerItem: number;
  status: 'ordered' | 'paid' | 'canceled';
  rating: null | boolean;
}
