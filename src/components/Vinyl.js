import './../App.css';

export default function Vinyl(props) {
    return (
        <div className="VinylItem">
            <img src={props.cover} alt={props.name + " by " + props.artist} id="img"/>
            <h4 id="header-text">"{props.name}" by {props.artist}</h4>
            <div id="body-text">
                <p>Genre: {props.genre}</p>
                <p>Decade: {props.decade}</p>
                <p>Price: ${props.price}</p>
            </div>
            <button
                onClick={() => 
                    {
                        if (!props.cart.includes(props.name)) { // click add to cart
                            // fixes js float math
                            props.setTotalPrice(Math.round((props.totalPrice + props.price) * 1e12) / 1e12);
                            // add item to cart
                            props.setCart([...props.cart, props.name]);
                        } else { // click remove from cart
                            // fixes js float math
                            props.setTotalPrice(Math.round((props.totalPrice - props.price) * 1e12) / 1e12);
                            // remove item from cart
                            props.setCart(props.cart.filter((item) => item !== props.name));
                        }
                    }}
                >
                    {props.cart.includes(props.name) ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    );
}