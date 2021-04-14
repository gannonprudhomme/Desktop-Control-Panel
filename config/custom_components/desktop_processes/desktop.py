import os
from dataclasses import dataclass
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity, DataUpdateCoordinator, UpdateFailed
)
import socketio
from socketio.exceptions import ConnectionError

from .const import DOMAIN

# TODO Can we define this in the constuctor?
sio = socketio.AsyncClient()

URL = "https://localhost:3001/"

ICON_PATH = "../../www/icons/"

@dataclass
class Process():
    """ Data describing a process """
    name: str
    volume: int
    icon: str

class Desktop(Entity):
    """ Representation of a Desktop entity, which allows you access to a variety of
        resources on the Desktop
    """

    def __init__(self, url: str):
        """ Initialize the Desktop. """

        # self._state = [Process('Spotify', 10, None)]
        self._state = 123
        self.url = url
        self.processes = []
        print(f"\nentity {url}\n")

        # self.socket.send()

    async def connect(self):
        @sio.event
        async def connect():
            print('entity connected\n')
            
        @sio.event
        async def disconnect():
            print('entity disconnected\n')

        print("attempting to connect\n")
        # try:
        await sio.connect(self.url)
        print("done connecting\n")
        # except ConnectionError as err:
            # print(err)
            # pass

    @property
    def device_info(self):
        return {
            "identifiers": {
                (DOMAIN, self.unique_id),
            },
            "name": "Some desktop name", #self.name
        }

    @property
    def name(self):
        """ Return the name of the Desktop. """
        # Where do we get this from?
        return 'Desktop-1'

    @property
    def state(self):
        """ Return the state of the Desktop. """
        return str(self._state)

    @property
    def state_attributes(self):
        """Return the state attributes"""
        result = {
            'processes': self.processes,
        }
        return result

    @property
    def unique_id(self):
        return f'desktop_process-{self.url}'

    async def async_update(self):
        """ Fetch new state data for the sensor.
            This is the only method that should fetch new data for Home Assistant.
        """
        def get_volume_icon(name: str):
            """ Wrapper function that allows us to pass the name to the async function
                that will actually handle the returned data from the socket
            """
            async def write_data_to_file(data):
                """ Actually writes the bytes data to the file """
                dir = os.path.dirname(__file__)
                # TODO: Define this elsewhere (and validate the path?)
                # Also make the folder if it doesn't exist
                filename = os.path.join(dir, "..", "..", "www", "icons", f"{name}.png")

                with open(filename, "wb+") as f:
                    f.write(data)
            
            return write_data_to_file

        async def get_volumes(data):
            # TODO: Probably need to validate data
            self.processes = data

            # Get the volume icon for each process
            for proc in self.processes:
                if not 'name' in proc: # Will this ever work???? Can we use .get()?
                    pass
                name = proc['name']
                await sio.emit('get_volume_icon', name, None, get_volume_icon(name))

        await sio.emit('get_volumes', 'something', None, get_volumes)

        # Make a socket request
        self._state = 23

    async def set_volume(self, pid: int, volume: int):
        if not sio.connected:
            print("Not connected!")
        # TODO: Probably need to validate pid and volume

        await sio.emit('set_volume_proc', { 'pid': pid, 'volume': volume });
