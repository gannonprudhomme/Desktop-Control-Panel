from dataclasses import dataclass
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity, DataUpdateCoordinator, UpdateFailed
)
import socketio
from socketio.exceptions import ConnectionError

from .const import DOMAIN

sio = socketio.AsyncClient()

URL = "https://localhost:3001/"

"""
@sio.event
async def connect():
    print("desktop connected?")
"""

async def async_setup_entry(hass, config_entry, async_add_devices):
    print("\n\nPLATFORM ASYNC SETUP \n\n")

async def async_setup_platform(hass, config, add_entities, discovery_info=None):
    """ Setup the platform """
    # This is where we add an entity
    print("\n\PLATFORM nasync setup platform\n\n")
    add_entities([Desktop()])



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
        print('state_attributes\n')
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
        async def get_volumes(data):
            # TODO: Probably need to validate data
            self.processes = data

        print("update")
        await sio.emit('get_volumes', 'something', None, get_volumes)

        # Make a socket request
        self._state = 23