/// <reference types="cypress" />

describe('product page', () => {
  it('should be accessible via direct link')
  it('has three small clickable images')
  it('can show main product image in big')
  it('has a good product title')
  it('has details tabs with correct content')

  describe('choose size', () => {
    it('shows default availability')
    it('shows correct status if a piece is not available')
    it('has always available stock for one-size products')
    it('does not show size selection for one-size product')
  });

  describe('cart', () => {
    it('should be empty upon initialization')
    it('updates number of products as we add more and more to it')
  });
});
