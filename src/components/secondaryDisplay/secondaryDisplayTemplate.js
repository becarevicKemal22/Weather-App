export default `
    <div class="tabs">
        <div class="tab">
            <h2 id="mInfo">More info</h2>
        </div>
        <div class="tab">
            <h2 id="precipitation">Precipitation</h2>
        </div>
    </div>
    <div class="sides">
        <div class="side">
            <div class="group">
                <p><i class="fa-solid fa-temperature-half fa-fw"></i> Feels like</p>
                <h2 id="fl"></h2>
            </div>
    
            <div class="group">
                <p><i class="fa-solid fa-wind fa-fw"></i></i> Wind</p>
                <h2 id="w"></h2>
            </div>
        </div>
        <div class="side">
            <div class="group">
                <p><i class="fa-solid fa-droplet fa-fw"></i> Humidity</p>
                <h2 id="h"></h2>
            </div>
    
            <div class="group">
                <p><i class="fa-solid fa-sun fa-fw"></i> UV Index</p>
                <h2 id="UV"></h2>
            </div>
        </div>
    </div>
    <div class="precipitation">
        <canvas id="precipitationChart"></canvas>
    </div>
`
