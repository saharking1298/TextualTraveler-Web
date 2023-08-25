export default {
    start: "city.center",
    rooms: {
        "city.center": {
            name: "City Center",
            description: "This is the city's hub, a lively core where tall buildings mix with parks and markets. People from all around come for the food, shopping, and city vibes.",
            guide: "You can go north to the market, or go south to the city park. You can enter the city tower.",
            locations: {
                "north": "city.market",
                "south": "city.park",
                "tower": "city.center.tower"
            }
        },
        "city.market": {
            name: "City Market",
            description: "The city market is a busy area with lots of stalls. You can buy fresh food, unique handmade items, and astonishing pieces of art there.",
            guide: "You can go south to the city center.",
            locations: {
                "south": "city.center"
            }
        },
        "city.park": {
            name: "City Park",
            description: "The city park is a calm and green space in the middle of the busy city. It has nice paths for walking, pretty ponds, and places to sit and relax. It's like a peaceful getaway from the noisy city.",
            guide: "You can go north to the city center.",
            locations: {
                "north": "city.center"
            }
        },
        "city.center.tower": {
            name: "City Tower",
            description: "This tower is located at the heart of the city, and 56 stories high. There is an elevator that leads to the top of the tower.",
            guide: "You can go up to the top of the tower, or out to the city center.",
            locations: {
                "out": "city.center",
                "up": "city.center.tower"
            }
        }
    }
}