const activity = require('../src/components/Activity/Activity');

it('Debe renderizar un formulario', () => {
    expect(activity.find('form').length).toBe(1);
});