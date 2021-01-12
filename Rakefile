task :host do
  sh "budo -d docs"
end

task :style do
  sh "parse-hocon hocon/img.conf > docs/img.json"
  sh "gl-style-validate docs/img.json"
end

task :produce do
  sh "node index.js"
end

