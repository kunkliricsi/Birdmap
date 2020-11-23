# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /app
EXPOSE 80

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs

# copy csproj and restore as distinct layers
WORKDIR /src
COPY . .
RUN dotnet restore "Birdmap.API/Birdmap.API.csproj"

# copy everything else and build app
RUN dotnet publish "Birdmap.API/Birdmap.API.csproj" -c Release -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Birdmap.API.dll"]
