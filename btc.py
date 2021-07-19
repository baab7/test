from telethon import events
import asyncio
import os
import sys
import requests
import json
@borg.on(events.NewMessage(pattern=r"\.btc", outgoing=True))
async def _(event):
    if event.fwd_from:
        return
       
    r=requests.get('https://blockchain.info/ru/ticker').json()["RUB"]["buy"]
    await event.edit(f"""**BITCOIN**
1 ```BTC```: {r}₽""")
