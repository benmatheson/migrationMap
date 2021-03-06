library(tidyverse, jsonlite)
library(jsonlite)
library(readxl)



setwd("projects/migration/data")
getwd()


migRaw <- read_csv("metro-to-metro-2011-2015.csv")

mig <- migRaw[4:(nrow(migRaw)-7),c(3,16,27)]
colnames(mig) <- c("to", "from", "num")
str(mig)
mig$num <- gsub(",","", mig$num)
mig$num <- as.numeric(mig$num)
mig$to <- gsub(" Metro Area", "", mig$to)
mig$from <- gsub(" Metro Area", "", mig$from)

write_json(mig, "migration.json")

View(mig)
str(mig)
max(mig$num)
unq <- unique(mig$num)

unqLoc <- unique(mig$from)
centroids <- read_csv("centroidsGeo.csv")
View(centroids)
View(unqLoc)
write_json(centroids, "centroids.js")
