$(document).ready(function () {

    var savedCity = sessionStorage['savedCity'];
    var savedState = sessionStorage['savedState'];

    console.log("savedCity",savedCity);
    console.log("savedState",savedState);

    if (savedCity && savedState) {

        displayLocation(savedCity, savedState);
    }
    else{

        geoLookup();
    }

    function geoLookup(){

        // Get geolocation for the calling machine's IP address with an API key (optional, if you're using "Request Origin" feature at IP Geolocation API)
        getGeolocation(handleResponse, "8f37136c94cf4348bd30b6c4f276b73b");

        // Don't pass the API key if you're using the "Request Origin" feature at IP Geolocation API
        getGeolocation(handleResponse);

        // Toggle API calls' async behavior. By default, async is true.
        setAsync(true);

        // Function to handle response from IP Geolocation API
        function handleResponse(json) {

            if (!json.message) {

                var p = new Promise(function (resolve, reject) {

                    state = getStateAbbr(json.state_prov);

                    resolve([json.city, state]);
                });

                p.then(function ([city, state]) {

                    sessionStorage['savedCity'] = city;
                    sessionStorage['savedState'] = state;

                    displayLocation(city, state);
                });
            }
        }
    }

    function displayLocation(city, state){

        $("#cityState").text(`${city}, ${state}`);

        $("#geoBtn").click(function () {

            window.location = `https://www.cancer.org/content/cancer/en/involved/event-search.listing.html?zip=&city=${city}&state=${state}&local-radius=100&textsrch=&startDate=02%2F11%2F2019&endDate=&categoryName=`;
        });
    }

    var states = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District Of Columbia': 'DC',
        'Federated States Of Micronesia': 'FM',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'MP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Palau': 'PW',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virgin Islands': 'VI',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
    }

    function getStateAbbr(name) {
        return states[name];
    };

});