import requests as r
response = r.request("POST","http://localhost:4545/create_new_data", data='{}', headers= {'Content-Type': 'application/json'})
# response =r.request("DELETE",f"http://localhost:4545/delete_data/Group5@torontomu.ca", headers= {'Content-Type': 'application/json'})



print(response.text)