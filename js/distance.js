(async function () {
    const myLat = 31.168557;   // 👈 你的纬度（你之前问过）
    const myLon = 121.583657;  // 👈 你的经度

    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const userLat = data.latitude;
        const userLon = data.longitude;

        const distance = getDistance(myLat, myLon, userLat, userLon);

        document.getElementById("distance").innerText =
            distance.toFixed(0) + " km";
    } catch (e) {
        document.getElementById("distance").innerText = "未知";
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 地球半径 km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
})();