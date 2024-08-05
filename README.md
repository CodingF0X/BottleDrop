# BottleDrop
A Domain-Driven Design Approach to developing Beverage Management system.

# Description
BottleDrop is a distributed microservices application designed to manage beverage services at an event.
It consists of four contexts: Warehouse, Bar, Drop Point, Bar and User. <br/>
The Bar microservice handles beverage stock management and visitor orders, while relying on the Warehouse for inventory replenishment.
Drop Point service communicates with the Warehouse for bottle returns. <br/>
for more details: 
[Project Documentation](https://github.com/CodingF0X/BottleDrop/wiki/BottleDrop-%E2%80%90-Project-Documentation) 

<br/> <br/> 

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/CodingF0X/BottleDrop.git
    ```
4.  run the app:
    ```bash
    docker-compose up
    ```

## Usage
The web app is very basic, the goal of this UI is to demonstrate MSA, Service Discovery using Eureka, Spring cloud Config and Circuit breaker using Opossum.<br/>
Head to http://localhost:3000 to open the React app. To log in, simply enter the appropriate email address based on the mocked role you want to assume:

- Warehouse Assistant: warehouse@gmail.com
- Bartender: bartender@gmail.com

No other information is required for the login.
After successfully logging in as a Warehouse Assistant, click the avatar icon in the top right corner and then select "Dashboard." 
You will be redirected to the Warehouse Dashboard to view live warehouse data.
If you log in as a Bartender, click on the desired bar from the navbar to see live data from the dashboard of each bar.

<br/>
For comprehensive technical details: <br/>
[Solution Architecture](https://github.com/CodingF0X/BottleDrop/wiki/Solution-Architecture)

<br/>

## Project status
### Current status
At this moment, development has temporarily paused <br/>
Despite the temporary pause, I am excited about the future development of this project. Here are the plans for when I resume work:

Exploring New Technologies: I intend to integrate various new technologies to enhance the project. This will involve researching and implementing tools and frameworks that can improve performance and user experience.

Improving Scalability: Ensuring the project can scale effectively is a priority. This includes optimizing the current codebase, improving data management practices, and possibly restructuring the architecture to support larger datasets and a greater number of users. Also would utilize Eureka for load balancing and use Spring Cloud Gateway to efficiently route and manage network traffic.



