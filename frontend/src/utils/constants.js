export const mapColorObj2 = [
    {
        range: [0, 10],
        color: "##d0eaf0",
        label: "Crime Number < 10"
    },
    {
        range: [10, 50],
        color: "#f4e2e2",
        label: "10 ≤ Crime Number < 50"
    },
    {
        range: [50, 200],
        color: "#eebab9",
        label: "50 ≤ Crime Number < 200"
    },
    {
        range: [200, 500],
        color: "#e59190",
        label: "200 ≤ Crime Number < 500"
    },
    {
        range: [500, 1000],
        color: "#acacac",
        label: "500 ≤ Crime Number < 1000"
    },
    {
        range: [1000, 1500],
        color: "#8e44ad", // Purple
        label: "1000 ≤ Crime Number < 1500"
    },
    {
        range: 1500,
        color: "#902728",
        label: "Crime Number ≥ 1500"
    }
];



export const mapColorObj = [
    {
        range: [0,10],
        color: "#ffffff",
        label: "Crime Number < 10"
    },
    {
        range: [10, 50],
        color: "#ccdaee",
        label: "10 ≤ Crime Number < 50"
    },
    {
        range: [50, 200],
        color: "#99b5dd",
        label: "50 ≤ Crime Number < 200"
    },
    {
        range: [200, 500],
        color: "#7fa3d5",
        label: "200 ≤ Crime Number < 500" 
    },
    {
        range: [500, 1000],
        color: "#6690cc",
        
        label: "500 ≤ Crime Number < 1000"
    },
    {
        range: [1000, 1500],
        color: "#326bbb",
        
        label: "1000 ≤ Crime Number < 1500"
    },
    {
        range: 1500,        
        color: "#0047ab",
        label: "Crime Number ≥ 1500"
    }
];

export const defaultColor = "black";

export const mapColorObj1 = 
  [
        { color: "#ffffff", label: "Crime Number < 10" },
        { color: "#326bbb", label: "10 >= Crime Number < 50" },
        { color: "#6690cc", label: "50 >= Crime Number < 200" },
        { color: "#7fa3d5", label: "200 >= Crime Number < 500" },
        { color: "#6690cc", label: "500 >= Crime Number ≤ 1000" },
        { color: "#326bbb", label: "1000 >= Crime Number ≤ 1500" },
        { color: "#0047ab", label: "Crime Number > 1500" },
      ];