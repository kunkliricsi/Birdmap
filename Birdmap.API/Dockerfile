FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && apt-get install -y nodejs
WORKDIR /src
COPY ["Birdmap.API/Birdmap.API.csproj", "Birdmap.API/"]
COPY ["Birdmap.BLL/Birdmap.BLL.csproj", "Birdmap.BLL/"]
COPY ["Birdmap.Common/Birdmap.Common.csproj", "Birdmap.Common/"]
COPY ["Birdmap.DAL/Birdmap.DAL.csproj", "Birdmap.DAL/"]
RUN dotnet restore "Birdmap.API/Birdmap.API.csproj"
COPY . .
WORKDIR "/src/Birdmap.API"
RUN dotnet build "Birdmap.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Birdmap.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Birdmap.API.dll"]