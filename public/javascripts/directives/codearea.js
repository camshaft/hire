module.exports = [
  function() {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var editor = window.ace.edit(element[0]);

        $scope.$watch(attrs.codearea, function(input) {
          editor.setTheme('ace/theme/' + (input.theme || 'solarized_dark'));

          editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Esc',  mac: 'Esc'},
            exec: function(editor) {
              editor.setKeyboardHandler('ace/keyboard/vim');
            }
          });

          var session = editor.getSession();
          session.setMode('ace/mode/' + (input.mode || 'javascript'));
          session.setTabSize(input.tabsize || 2);
          session.setUseSoftTabs(true);
          session.setValue(input.value || '');

          session.on('change', function() {
            input.$model = session.getValue();
            $scope.$digest();
          });
        });
      }
    };
  }
];
