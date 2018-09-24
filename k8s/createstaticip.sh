#!/bin/bash

AKS_RESOURCE_GROUP=k8s_diegom
AKS_CLUSTER_NAME=diegom

az resource show --resource-group k8s_diegom --name diegom --resource-type Microsoft.ContainerService/managedClusters --query properties.nodeResourceGroup -o tsv

az network public-ip create --resource-group MC_k8s_diegom_diegom_westeurope --name diegomPublicIP --allocation-method static

az network public-ip list --resource-group MC_k8s_diegom_diegom_westeurope --query [0].ipAddress --output tsv